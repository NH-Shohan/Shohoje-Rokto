"use client";

import { Separator } from "@/components/ui/separator";
import { UserAuth } from "@/context/AuthContext";

import posts from "@/fakeDB/requestedPost.json";

const BloodPosts = () => {
  const { currentUser } = UserAuth();
  console.log(currentUser);

  return (
    <>
      {currentUser && (
        <div>
          <h3 className="text-foreground">Blood Posts</h3>
          <p>Your requested blood posts</p>

          <Separator className="my-5" />

          <div className="overflow-auto h-[calc(100vh-220px)] scrollbar-none">
            <div className="grid grid-cols-2 gap-5">
              {posts.map((post, index) => (
                <>
                  {currentUser.userId == post.donorId ? (
                    <div
                      key={index}
                      className="bg-background border rounded-xl overflow-hidden"
                    >
                      <div className="bg-red-100 dark:bg-light px-6 py-4">
                        <p className="text-xl text-primary font-medium">
                          Blood Donation Request
                        </p>
                      </div>
                      <div className="p-6">
                        <div className="mb-4">
                          <h3 className="text-xl font-medium mb-1">
                            Patient Information
                          </h3>
                          <p>
                            <strong>Patient Name:</strong> {post.patientName}
                          </p>
                          <p>
                            <strong>Condition:</strong> {post.condition}
                          </p>
                          <p>
                            <strong>Blood Group:</strong> {post.bloodGroup}
                          </p>
                          <p>
                            <strong>Age:</strong> {post.patientAge}
                          </p>
                          <p>
                            <strong>Gender:</strong> {post.gender}
                          </p>
                        </div>
                        <div className="mb-4">
                          <h3 className="text-xl font-medium mb-1">
                            Donation Details
                          </h3>
                          <p>
                            <strong>Required Bags:</strong> {post.bagsQuantity}
                          </p>
                          <p>
                            <strong>Donation Date:</strong> {post.donationDate}
                          </p>
                          <p>
                            <strong>Posted Date:</strong> {post.postedDate}
                          </p>
                        </div>
                      </div>
                      <div className="border-t p-6">
                        <div className="mb-4">
                          <h3 className="text-xl font-medium mb-2">
                            Contact Information
                          </h3>
                          <p>
                            <strong>Phone Number:</strong> {post.phoneNumber}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-xl font-medium mb-2">
                            Location Information
                          </h3>
                          <p>
                            <strong>Division:</strong> {post.division}
                          </p>
                          <p>
                            <strong>District:</strong> {post.district}
                          </p>
                          <p>
                            <strong>Subdistrict:</strong> {post.subdistrict}
                          </p>
                          <p>
                            <strong>Hospital:</strong> {post.hospitalName}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BloodPosts;
