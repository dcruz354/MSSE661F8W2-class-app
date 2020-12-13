const userApiService = new UserApiService();

describe('Order App - User Auth', () => {
    xit('should GET an user', async () => {
        const expected = [
            {
              user_id: 1,
              username: 'admin',
              email: 'admin@example.com',
            },
        ];
          const getUserServiceSpy = spyOn(userApiService, 'getMe');

          const actual = await userApiService.getMe();
          
          console.log(actual);

            expect(getUserServiceSpy).toHaveBeenCalled();
    });

    xit('should Update an user', async () => {
        const expected = [
            {
              user_id: 1,
              username: 'admin',
              email: 'admin@example.com',
            },
        ];
          const updateUserServiceSpy = spyOn(userApiService, 'updateMe');

          const actual = await userApiService.updateMe();
          
          console.log(actual);

            expect(updateUserServiceSpy).toHaveBeenCalled();
    });
});