import { useEffect, useState } from 'react';

import './home.css';

import { useNavigate } from 'react-router';

import { bitbucketPullRequestRegex } from '~/consts';

import { NoPageEmptyState } from './no-page-empty-state';
import { PullRequestSetter } from './pull-request-setter';

export const Home = () => {
  const [firstRender, setFirstRender] = useState(true);
  const [user, setUser] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [isPullRequestPage, setIsPullRequestPage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setIsPullRequestPage(
        tabs[0].url.match(bitbucketPullRequestRegex) !== null,
      );
    });

    const fetchStoredData = () => {
      chrome.storage.sync.get(['userEx', 'passwordEx'], (result) => {
        if (result.userEx) {
          setUser(result.userEx);
        }
        if (result.passwordEx) {
          setPassword(result.passwordEx);
        }
        setFirstRender(false);
      });
    };

    fetchStoredData();

    const storageListener = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes.userEx?.newValue) {
        setUser(changes.userEx.newValue);
      }
      if (changes.passwordEx?.newValue) {
        setPassword(changes.passwordEx.newValue);
      }
    };

    chrome.storage.onChanged.addListener(storageListener);

    return () => {
      chrome.storage.onChanged.removeListener(storageListener);
    };
  }, []);

  useEffect(() => {
    if (!firstRender && !user) {
      navigate('/user-input');
    } else if (!firstRender && !password) {
      navigate('/password-input');
    }
  }, [user, password, firstRender]);

  if (!isPullRequestPage) {
    return <NoPageEmptyState />;
  }

  return <PullRequestSetter />;
};
