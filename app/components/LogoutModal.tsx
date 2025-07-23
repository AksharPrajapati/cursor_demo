import React from "react";
import Modal from "./common/Modal";
import Button from "./common/Button";

interface LogoutModalProps {
  show: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  show,
  onClose,
  onLogout,
}) => {
  return (
    <Modal show={show} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        Confirm Logout
      </h2>
      <p className="mb-6 text-gray-700 dark:text-neutral-300 text-center">
        Are you sure you want to log out?
      </p>
      <div className="flex gap-4 w-full">
        <Button variant="secondary" fullWidth onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" fullWidth onClick={onLogout}>
          Logout
        </Button>
      </div>
    </Modal>
  );
};

export default React.memo(LogoutModal);
