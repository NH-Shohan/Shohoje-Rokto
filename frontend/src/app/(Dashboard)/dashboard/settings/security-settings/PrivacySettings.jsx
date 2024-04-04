import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PrivacySettings = () => {
  return (
    <div className="space-y-3">
      <Input type="password" placeholder="Current Password" />
      <div className="grid grid-cols-2 gap-3">
        <Input type="password" placeholder="New Password" />
        <Input type="password" placeholder="Confirm New Password" />
      </div>

      <Button className="w-1/4" variant="outline">
        Save
      </Button>
    </div>
  );
};

export default PrivacySettings;
