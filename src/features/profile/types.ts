export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
  createdAt: Date;
}

export interface ProfileStats {
  jobCount: number;
  applicationCount: number;
  recruiterCount: number;
}

export interface UpdateProfileData {
  name?: string;
  avatarUrl?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
