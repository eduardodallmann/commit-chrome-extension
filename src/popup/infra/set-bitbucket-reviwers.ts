import axios from 'axios';

export async function setBitbucketReviewers({
  codeBase,
  repoName,
  prId,
  user,
  password,
  reviewers,
}: {
  codeBase: string;
  repoName: string;
  prId: string;
  user: string;
  password: string;
  reviewers: Array<{ uuid: string }>;
}) {
  const url = `https://api.bitbucket.org/2.0/repositories/${codeBase}/${repoName}/pullrequests/${prId}`;
  const credentials = window.btoa(`${user}:${password}`);

  await axios.put(
    url,
    { reviewers },
    {
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
    },
  );
}
