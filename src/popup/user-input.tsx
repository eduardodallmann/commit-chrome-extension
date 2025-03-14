import { useEffect, useState } from 'react';

import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router';

import { Input } from './components/forms';
import { Icon } from './components/icon';
import { Wrapper } from './components/wrapper';

export function UserInput() {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>('');

  const onClick = () => {
    chrome.tabs.create({ url: 'https://bitbucket.org/account/settings/' });
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  const onSave = () => {
    chrome.storage.sync.set({ userEx: value });

    navigate('/password-input');
  };

  useEffect(() => {
    chrome.storage.sync.get('userEx', (result) => {
      setValue(result.userEx || '');
    });
  }, []);

  return (
    <Wrapper>
      <Icon
        icon="info"
        className="text-gray-900 dark:text-white absolute top-4 right-4"
        onClick={onClick}
      />
      <div className="flex flex-col space-y-4">
        <Input
          name="user"
          label="Nome de usuário"
          type="text"
          value={value}
          onChange={onChange}
        />
        <Button disabled={!value} onClick={onSave}>
          Salvar
        </Button>
      </div>
    </Wrapper>
  );
}
