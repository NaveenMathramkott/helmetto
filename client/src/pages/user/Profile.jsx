import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authProvider";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import {
  FiMail,
  FiLock,
  FiUnlock,
  FiUser,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";

const Profile = ({ redirect }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState(auth?.user?.name || "");
  const [email, setEmail] = useState(auth?.user?.email || "");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState(auth?.user?.address || "");
  const [mobNumber, setMobNumber] = useState(auth?.user?.phone || "");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/v1/auth/profile-update`,
        {
          name,
          password,
          email,
          address,
          phone: mobNumber,
          user: auth?.user,
        },
      );
      toast.success(res.data.message, { duration: 4000 });

      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res?.data?.token ? res?.data?.token : auth?.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
      } else {
        toast.error(res.data.message);
      }
      if (redirect) navigate(redirect);
    } catch (error) {
      toast.error(`Error updating profile`);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Update Profile</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage your account settings
          </p>
        </CardHeader>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
          id="profile-form"
        >
          <CardContent className="pt-0 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="profileName">Name</Label>
              <div className="relative">
                <FiUser
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <Input
                  id="profileName"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profileEmail">Email address</Label>
              <div className="relative">
                <FiMail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <Input
                  id="profileEmail"
                  type="email"
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profilePassword">Password</Label>
              <div className="relative">
                <FiLock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <Input
                  id="profilePassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Leave blank to keep current password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <FiUnlock size={18} /> : <FiLock size={18} />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Leave blank to keep your current password
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profileAddress">Home Address</Label>
              <div className="relative">
                <FiMapPin
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <Input
                  id="profileAddress"
                  type="text"
                  placeholder="Permanent Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="profilePhone">Phone Number</Label>
              <div className="relative">
                <FiPhone
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <Input
                  id="profilePhone"
                  type="tel"
                  placeholder="Mobile Number"
                  value={mobNumber}
                  onChange={(e) => setMobNumber(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              disabled={!name || !email || !mobNumber || !address}
            >
              Update Profile
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
