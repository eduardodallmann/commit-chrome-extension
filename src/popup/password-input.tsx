import { useEffect, useState } from 'react';

import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router';

import { Input } from './components/forms';
import { Icon } from './components/icon';
import { Wrapper } from './components/wrapper';

export function PasswordInput() {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>('');

  const onClick = () => {
    chrome.tabs.create({
      url: 'https://bitbucket.org/account/settings/app-passwords/',
    });
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  const onSave = () => {
    chrome.storage.sync.set({ passwordEx: value });

    navigate('/');
  };

  useEffect(() => {
    chrome.storage.sync.get('passwordEx', (result) => {
      setValue(result.passwordEx || '');
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
          name="password"
          label="Senha de App"
          type="password"
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
