import { MemoryRouter, Route, Routes } from 'react-router';

import { Home } from './home';
import { PasswordInput } from './password-input';
import { UserInput } from './user-input';

export function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-input" element={<UserInput />} />
        <Route path="/password-input" element={<PasswordInput />} />
      </Routes>
    </MemoryRouter>
  );
}
