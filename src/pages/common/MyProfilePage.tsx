import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { create_profile } from "../../api/services/profilesService";
import { match_userProfile } from "../../api/services/usersService";
import { PrimaryButton } from "../../components/atoms/common/Button";
import { LoaderComponent } from "../../components/atoms/common/LoaderComponent";
import { Photo } from "../../components/atoms/common/Photo";
import AdminLayout from "../../components/templates/AdminLayout";
import MainLayout from "../../components/templates/MainLayout";
import useStore from "../../store/useStore";

export default function MyProfilePage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { name: role } = useStore((store) => store.user.role);
  const user = useStore((store) => store.user);
  const userProfile = useStore((store) => store.user.userProfile);

  const navigate = useNavigate();

  const handleProfile = async () => {
    const res = await create_profile({
      newData: {
        name: user.email,
        profilePhoto:
          "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
      },
      setState: setIsLoading,
    });

    if (!res) return;

    const match = await match_userProfile({
      id_user: user.id,
      id_userProfile: res.id,
      setState: setIsLoading,
    });

    if (!match) return;

    navigate(`/profile/${match.userProfile.id}`);
  };

  const Profile = () => (
    <>
      {userProfile ? (
        <div className="p-4">
          <h1 className="mb-4 text-center text-5xl font-bold">Mi perfil</h1>
          <div className="rounded-lg bg-zinc-500 p-4">
            <Photo
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                display: "block",
                margin: "0 auto",
              }}
              className="text-4xl"
            />

            <p className="my-4 text-center text-3xl font-semibold">
              {userProfile.name}
            </p>

            <div className="flex justify-center">
              <PrimaryButton
                onClick={() => navigate(`/profile/${userProfile.id}`)}
              >
                Editar perfil
              </PrimaryButton>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="my-4 text-center text-3xl font-semibold">
            Actualmente no tienes un perfil, vamos a crearlo!
          </p>

          <PrimaryButton disabled={isLoading} onClick={handleProfile}>
            <LoaderComponent isLoading={isLoading}>
              Crear perfil
            </LoaderComponent>
          </PrimaryButton>
        </div>
      )}
    </>
  );

  switch (role) {
    case "admin":
      return (
        <AdminLayout>
          <Profile />
        </AdminLayout>
      );
    case "organizer":
      return (
        <AdminLayout>
          <Profile />
        </AdminLayout>
      );
    case "user":
      return (
        <MainLayout>
          <Profile />
        </MainLayout>
      );

    default:
      return <Navigate to="/" />;
  }
}
