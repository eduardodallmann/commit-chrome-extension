import axios from 'axios';

export type BitbucketResponse = {
  reviewers: Array<{
    display_name: string;
    uuid: string;
  }>;
};

export async function getBitbucketReviewers({
  codeBase,
  repoName,
  prId,
  user,
  password,
}: {
  codeBase: string;
  repoName: string;
  prId: string;
  user: string;
  password: string;
}) {
  const url = `https://api.bitbucket.org/2.0/repositories/${codeBase}/${repoName}/pullrequests/${prId}`;
  const credentials = window.btoa(`${user}:${password}`);

  const response = await axios.get<BitbucketResponse>(url, {
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data.reviewers;
}
