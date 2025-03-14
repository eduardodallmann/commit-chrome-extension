import { useEffect, useState } from 'react';

import type { AxiosError } from 'axios';
import { Button, HR } from 'flowbite-react';
import { useNavigate } from 'react-router';

import { bitbucketPullRequestRegex } from '~/consts';

import { Icon } from './components/icon';
import { Wrapper } from './components/wrapper';
import { getBitbucketReviewers } from './infra/get-bitbucket-reviewers';
import { setBitbucketReviewers } from './infra/set-bitbucket-reviwers';

type ListOfReviewers = Record<string, string>;

export function PullRequestSetter() {
  const navigate = useNavigate();
  const [listOfReviewers, setListOfReviewers] = useState<ListOfReviewers>({});
  const [getReviewersLoading, setGetReviewersLoading] = useState(false);
  const [errorOnGetReviewers, setErrorOnGetReviewers] = useState(0);

  const [setReviewersLoading, setSetReviewersLoading] = useState(false);
  const [errorOnSetReviewers, setErrorOnSetReviewers] = useState<{
    status: number;
    message?: string;
  }>({ status: 0 });

  const onClickSettings = () => {
    navigate('/user-input');
  };

  const convertAxiosStatusToError = (status: number, message?: string) => {
    if (status === 401) {
      return 'credenciais inválidas';
    }
    if (status === 404) {
      return 'repositório ou PR não encontrado';
    }
    if (status === 400 && message.includes('is the author')) {
      return 'você não pode adicionar você mesmo como reviewer';
    }

    return 'erro desconhecido';
  };

  const onClickAddUsers = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const [{ url }] = tabs;

      const matches = url.match(bitbucketPullRequestRegex);

      if (matches) {
        const [, codeBase, repoName, prId] = matches;

        chrome.storage.sync.get(['userEx', 'passwordEx'], async (result) => {
          const { userEx, passwordEx } = result;

          setGetReviewersLoading(true);
          setErrorOnGetReviewers(0);
          try {
            const reviewers = await getBitbucketReviewers({
              codeBase,
              repoName,
              prId,
              user: userEx,
              password: passwordEx,
            });

            const reviewersClean = reviewers.reduce((acc, reviewer) => {
              acc[reviewer.uuid] = reviewer.display_name;

              return acc;
            }, listOfReviewers);

            setListOfReviewers(reviewersClean);
            chrome.storage.sync.set({ reviewersEx: reviewersClean });
          } catch (error) {
            const axiosError = error as AxiosError;
            console.error(axiosError);
            setErrorOnGetReviewers(axiosError.status);
          } finally {
            setGetReviewersLoading(false);
          }
        });
      }
    });
  };

  const removeReviewer = (uuid: string) => {
    const newList = { ...listOfReviewers };
    delete newList[uuid];

    setListOfReviewers(newList);
    chrome.storage.sync.set({ reviewersEx: newList });
  };

  const applyReviewers = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const [{ url, id }] = tabs;

      const matches = url.match(bitbucketPullRequestRegex);

      if (matches) {
        const [, codeBase, repoName, prId] = matches;

        chrome.storage.sync.get(['userEx', 'passwordEx'], async (result) => {
          const { userEx, passwordEx } = result;

          setSetReviewersLoading(true);
          setErrorOnSetReviewers({ status: 0 });
          try {
            await setBitbucketReviewers({
              codeBase,
              repoName,
              prId,
              user: userEx,
              password: passwordEx,
              reviewers: Object.keys(listOfReviewers).map((uuid) => ({ uuid })),
            });
            chrome.tabs.reload(id);
            window.close();
          } catch (error) {
            const axiosError = error as AxiosError;
            console.error(axiosError);
            setErrorOnSetReviewers({
              status: axiosError.status,
              message: (axiosError.response.data as any).error.message,
            });
          } finally {
            setSetReviewersLoading(false);
          }
        });
      }
    });
  };

  useEffect(() => {
    chrome.storage.sync.get(['reviewersEx'], (result) => {
      if (result.reviewersEx) {
        setListOfReviewers(result.reviewersEx);
      }
    });
  }, []);

  return (
    <Wrapper>
      <Icon
        icon="settings"
        className="text-gray-900 dark:text-white absolute top-4 right-4"
        onClick={onClickSettings}
      />
      <div className="flex flex-col items-center justify-center space-y-2">
        <Button onClick={onClickAddUsers} disabled={getReviewersLoading}>
          Capturar reviewers desse PR
          <Icon
            icon="publish"
            className="text-gray-900 dark:text-white ml-2"
            size="icon-medium"
          />
        </Button>
        {Boolean(errorOnGetReviewers) && (
          <span className="text-red-500 dark:text-red-400 text-sm">
            Erro ao buscar reviewers,{' '}
            {convertAxiosStatusToError(errorOnGetReviewers)}
          </span>
        )}
      </div>
      <HR.Trimmed />
      {!Object.entries(listOfReviewers).length && (
        <span className="text-gray-900 dark:text-white text-center">
          Nenhum reviewer adicionado
        </span>
      )}
      <div className="w-full px-4 gap-2 flex flex-col">
        {Object.entries(listOfReviewers).map(([uuid, name]) => (
          <div
            key={uuid}
            className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md w-full"
          >
            <span className="text-gray-900 dark:text-white font-semibold capitalize">
              {name.toLowerCase()}
            </span>
            <Icon
              icon="close"
              className="text-red-500"
              onClick={() => removeReviewer(uuid)}
            />
          </div>
        ))}
      </div>
      {Object.entries(listOfReviewers).length && (
        <div className="flex flex-col items-center justify-center space-y-2">
          <Button
            className="mt-4"
            disabled={setReviewersLoading}
            onClick={applyReviewers}
          >
            Aplicar esses reviewers nesse PR
            <Icon
              icon="download"
              className="text-gray-900 dark:text-white ml-2"
              size="icon-medium"
            />
          </Button>
          {Boolean(errorOnSetReviewers.status) && (
            <span className="text-red-500 dark:text-red-400 text-sm">
              Erro aplicar os reviewers,{' '}
              {convertAxiosStatusToError(
                errorOnSetReviewers.status,
                errorOnSetReviewers.message,
              )}
            </span>
          )}
        </div>
      )}
    </Wrapper>
  );
}
