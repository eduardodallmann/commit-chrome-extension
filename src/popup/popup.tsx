import { useEffect, useState } from 'react';

import './popup.css';

import { bitbucketPullRequestRegex } from '~/consts';

import { NoPageEmptyState } from './no-page-empty-state';

export const Popup = () => {
  const [isPullRequestPage, setIsPullRequestPage] = useState(false);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setIsPullRequestPage(
        tabs[0].url.match(bitbucketPullRequestRegex) !== null,
      );
    });
  }, []);

  if (!isPullRequestPage) {
    return <NoPageEmptyState />;
  }

  return (
    <div>
      <h1 className="text-4xl text-green-500">This is a pull request page</h1>
    </div>
  );
};
