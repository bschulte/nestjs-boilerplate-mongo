import { AuthChecker } from 'type-graphql';
import { roles as userRoles } from 'common/constants';

export const authChecker: AuthChecker = async (
  { context }: { context: any },
  roles: string[],
) => {
  const { user } = context.req;
  if (!user) {
    return false;
  }

  // The resource only requires that there is an authenticated user
  if (user && roles.length === 0) {
    return true;
  }

  // Go through each of the approved roles for the resource and
  // see if the user matches one of them
  const hasRole = () =>
    user.roles.some(
      role =>
        !!roles.find(
          item =>
            item.toLowerCase() === role.name.toLowerCase() && role.enabled,
        ),
    );

  return user && user.roles && hasRole();
};
