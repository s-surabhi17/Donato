import React, { useEffect, useState } from "react";

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch("http://localhost:9900/donation-history", {
          credentials: "include", // very important for session-based auth
        });
        const data = await res.json();
        setDonations(data.donations || []);
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading donation history...</p>;

  if (donations.length === 0) {
    return <p className="text-center mt-8 text-gray-600">You haven’t made any donations yet.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Donation History</h2>
      <div className="space-y-4">
        {donations.map((donation) => (
          <div
            key={donation._id}
            className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white"
          >
            <p className="text-lg font-semibold">Type: {donation.type}</p>
            <p className="text-gray-600">Location: {donation.location}</p>
            <p className="text-gray-600">Phone: {donation.phone}</p>
            <p className="text-gray-600">Date: {donation.date}</p>
            <p className="text-gray-600">Time: {donation.time}</p>
            <p className="text-gray-600">
              Prepared {donation.meal?.[0]?.preparedHoursAgo} hour(s) ago
            </p>
            <p className="text-gray-600">Quantity: {donation.meal?.[0]?.quantity}</p>
            <p className="text-gray-600">
              Donated on: {new Date(donation.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationHistory;
