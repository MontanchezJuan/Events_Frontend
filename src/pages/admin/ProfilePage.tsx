import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserProfile } from "../../api/interfaces/user";
import { profile_by_id } from "../../api/services/profilesService";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import { ProfileForm } from "../../components/molecules/forms/ProfileForm";
import AdminLayout from "../../components/templates/AdminLayout";
import MainLayout from "../../components/templates/MainLayout";
import useStore from "../../store/useStore";

interface RouteParams extends Record<string, string | undefined> {
  id: string;
}

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const { name: role } = useStore((store) => store.user.role);

  const { id } = useParams<RouteParams>();

  useEffect(() => {
    const fetchProfile = async () => {
      if (id) {
        setProfile(await profile_by_id({ id, setState: setIsLoading }));
      }
    };

    fetchProfile();
  }, [id]);

  switch (role) {
    case "admin":
      return (
        <AdminLayout>
          <LoaderComponent isLoading={isLoading}>
            <ProfileForm initialValues={profile} />
          </LoaderComponent>
        </AdminLayout>
      );
    case "organizer":
      return (
        <AdminLayout>
          <LoaderComponent isLoading={isLoading}>
            <ProfileForm initialValues={profile} />
          </LoaderComponent>
        </AdminLayout>
      );
    case "user":
      return (
        <MainLayout>
          <LoaderComponent isLoading={isLoading}>
            <ProfileForm initialValues={profile} />
          </LoaderComponent>
        </MainLayout>
      );

    default:
      return <Navigate to="/" />;
  }
}
