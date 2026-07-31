import React from 'react';
import ProfileCard from '../../components/profile/ProfileCard';
import SellerCard from '../../components/profile/SellerCard';

export default function Profile() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left & Middle section */}
        <div className="lg:col-span-9">
          <ProfileCard />
        </div>

        {/* Right Quick Links section */}
        <div className="lg:col-span-3">
          <SellerCard />
        </div>
      </div>
    </div>
  );
}