import { render, screen } from '@testing-library/react'
const defaultMockAuthStates = require('@tomfreudenberg/next-auth-mock').mockAuthStates;

module.exports = defaultMockAuthStates;
module.exports = {
    ...defaultMockAuthStates,
    
      session: {
        user: {
          id: 777,
          name: 'tester dude',
          email: 'email.tester@test.com',
          image:'',

        }
      }
    }

    describe('Pages', () => {
        describe('Signout', () => {
          it('should render want to sign out', () => {
            render(withMockAuth(<SignoutPage />, 'userAuthed'));
            expect(screen.getByText('Do you want to sign out?'));
          });
          it('should render not signed in', () => {
            render(withMockAuth(<SignoutPage />, 'unknown'));
            expect(screen.getByText('You are not signed in!'));
          });
        });
      });
 