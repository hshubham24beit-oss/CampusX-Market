
import { useParams } from "react-router-dom";
import ProfileCard from "../../components/profile/ProfileCard";
import SellerCard from "../../components/profile/SellerCard";

export default function Profile() {

  const { id } = useParams();

  return (
    <div className="space-y-6">

      <ProfileCard profileId={id} />

      {/* Listings for the viewed student (own profile or other users) */}
      <SellerCard userId={id} />

    </div>
  );
}