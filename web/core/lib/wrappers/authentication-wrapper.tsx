import type { ReactNode } from "react";
import { useEffect } from "react";
import { observer } from "mobx-react";
import { useSearchParams, usePathname } from "next/navigation";
import useSWR from "swr";
// components
import { LogoSpinner } from "@/components/common/logo-spinner";
// helpers
import { EPageTypes } from "@/helpers/authentication.helper";
// hooks
import { useWorkspace } from "@/hooks/store/use-workspace";
import { useUser, useUserProfile, useUserSettings } from "@/hooks/store/user";
import { useAppRouter } from "@/hooks/use-app-router";

type TPageType = EPageTypes;

type TAuthenticationWrapper = {
  children: ReactNode;
  pageType?: TPageType;
};

const isValidURL = (url: string): boolean => {
  const disallowedSchemes = /^(https?|ftp):\/\//i;
  return !disallowedSchemes.test(url);
};

export const AuthenticationWrapper = observer(function AuthenticationWrapper(props: TAuthenticationWrapper) {
  const pathname = usePathname();
  const router = useAppRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next_path");
  // props
  const { children, pageType = EPageTypes.AUTHENTICATED } = props;
  // hooks
  const { isLoading: isUserLoading, data: currentUser, fetchCurrentUser } = useUser();
  const { data: currentUserProfile } = useUserProfile();
  const { data: currentUserSettings } = useUserSettings();
  const { loader: workspacesLoader, workspaces } = useWorkspace();

  const { isLoading: isUserSWRLoading } = useSWR("USER_INFORMATION", async () => await fetchCurrentUser(), {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const isUserOnboard =
    currentUserProfile?.is_onboarded ||
    (currentUserProfile?.onboarding_step?.profile_complete &&
      currentUserProfile?.onboarding_step?.workspace_create &&
      currentUserProfile?.onboarding_step?.workspace_invite &&
      currentUserProfile?.onboarding_step?.workspace_join) ||
    false;

  const getWorkspaceRedirectionUrl = (): string => {
    let redirectionRoute = "/create-workspace";

    // validating the nextPath from the router query
    if (nextPath && isValidURL(nextPath.toString())) {
      redirectionRoute = nextPath.toString();
      return redirectionRoute;
    }

    // validate the last and fallback workspace_slug
    const currentWorkspaceSlug =
      currentUserSettings?.workspace?.last_workspace_slug || currentUserSettings?.workspace?.fallback_workspace_slug;

    // validate the current workspace_slug is available in the user's workspace list
    const isCurrentWorkspaceValid = Object.values(workspaces || {}).findIndex(
      (workspace) => workspace.slug === currentWorkspaceSlug
    );

    if (isCurrentWorkspaceValid >= 0) redirectionRoute = `/${currentWorkspaceSlug}`;

    return redirectionRoute;
  };

  // Handle redirects in useEffect to prevent infinite re-renders
  useEffect(() => {
    if (pageType === EPageTypes.NON_AUTHENTICATED && currentUser?.id) {
      if (currentUserProfile?.id && isUserOnboard) {
        const currentRedirectRoute = getWorkspaceRedirectionUrl();
        router.push(currentRedirectRoute);
      } else {
        router.push("/onboarding");
      }
    }

    if (pageType === EPageTypes.ONBOARDING) {
      if (!currentUser?.id) {
        router.push(`/${pathname ? `?next_path=${pathname}` : ``}`);
      } else if (currentUser && currentUserProfile?.id && isUserOnboard) {
        const currentRedirectRoute = getWorkspaceRedirectionUrl();
        router.replace(currentRedirectRoute);
      }
    }

    if (pageType === EPageTypes.SET_PASSWORD) {
      if (!currentUser?.id) {
        router.push(`/${pathname ? `?next_path=${pathname}` : ``}`);
      } else if (currentUser && !currentUser?.is_password_autoset && currentUserProfile?.id && isUserOnboard) {
        const currentRedirectRoute = getWorkspaceRedirectionUrl();
        router.push(currentRedirectRoute);
      }
    }

    if (pageType === EPageTypes.AUTHENTICATED) {
      if (!currentUser?.id) {
        router.push(`/${pathname ? `?next_path=${pathname}` : ``}`);
      } else if (currentUserProfile && currentUserProfile?.id && !isUserOnboard) {
        router.push(`/onboarding`);
      }
    }
  }, [pageType, currentUser, currentUserProfile, isUserOnboard, pathname, router, nextPath, currentUserSettings, workspaces]);

  if ((isUserSWRLoading || isUserLoading || workspacesLoader) && !currentUser?.id)
    return (
      <div className="relative flex h-screen w-full items-center justify-center">
        <LogoSpinner />
      </div>
    );

  if (pageType === EPageTypes.PUBLIC) return <>{children}</>;

  if (pageType === EPageTypes.NON_AUTHENTICATED) {
    if (!currentUser?.id) return <>{children}</>;
    // Redirect handled in useEffect
    return (
      <div className="relative flex h-screen w-full items-center justify-center">
        <LogoSpinner />
      </div>
    );
  }

  if (pageType === EPageTypes.ONBOARDING) {
    if (!currentUser?.id) {
      // Redirect handled in useEffect
      return (
        <div className="relative flex h-screen w-full items-center justify-center">
          <LogoSpinner />
        </div>
      );
    } else {
      if (currentUser && currentUserProfile?.id && isUserOnboard) {
        // Redirect handled in useEffect
        return (
          <div className="relative flex h-screen w-full items-center justify-center">
            <LogoSpinner />
          </div>
        );
      } else return <>{children}</>;
    }
  }

  if (pageType === EPageTypes.SET_PASSWORD) {
    if (!currentUser?.id) {
      // Redirect handled in useEffect
      return (
        <div className="relative flex h-screen w-full items-center justify-center">
          <LogoSpinner />
        </div>
      );
    } else {
      if (currentUser && !currentUser?.is_password_autoset && currentUserProfile?.id && isUserOnboard) {
        // Redirect handled in useEffect
        return (
          <div className="relative flex h-screen w-full items-center justify-center">
            <LogoSpinner />
          </div>
        );
      } else return <>{children}</>;
    }
  }

  if (pageType === EPageTypes.AUTHENTICATED) {
    if (currentUser?.id) {
      if (currentUserProfile && currentUserProfile?.id && isUserOnboard) return <>{children}</>;
      else {
        // Redirect handled in useEffect
        return (
          <div className="relative flex h-screen w-full items-center justify-center">
            <LogoSpinner />
          </div>
        );
      }
    } else {
      // Redirect handled in useEffect
      return (
        <div className="relative flex h-screen w-full items-center justify-center">
          <LogoSpinner />
        </div>
      );
    }
  }

  return <>{children}</>;
});
