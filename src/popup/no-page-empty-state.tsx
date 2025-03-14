import { Wrapper } from './components/wrapper';

export function NoPageEmptyState() {
  return (
    <Wrapper>
      <i className="bx bxs-contact bx-lg mb-5 dark:text-white" />
      <p className="text-base mb-2 uppercase font-bold dark:text-white">
        Essa não é uma página de pull request
      </p>
      <span className="text-m text-slate-400 block mb-10 dark:text-slate-50">
        Por favor, abra uma página de pull request no Bitbucket
      </span>
    </Wrapper>
  );
}
