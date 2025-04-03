import { test as base } from '@playwright/test';
import { existingUsers } from '../../test-setup/localstorage.setup'

type TUser = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}

export type TestOptions = {
  users: TUser[];
};

export const test = base.extend<TestOptions>({
  // Define an option and provide a default value.
  // We can later override it in the config.
  users: [...existingUsers], // Create a mutable copy of the readonly array
});