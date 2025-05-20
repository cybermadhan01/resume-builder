import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle } from
'@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, User, FileText, CheckSquare, History } from 'lucide-react';

interface UserProfile {
  user_id: string;
  full_name: string;
  job_title: string;
  profile_image: string;
  id: number;
}

interface UserActivity {
  user_id: string;
  resume_count: number;
  ats_check_count: number;
  last_active: string;
  id: number;
}

const ProfilePage = () => {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activity, setActivity] = useState<UserActivity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Form state
  const [fullName, setFullName] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/');
      return;
    }

    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        // Fetch user profile
        const profileResponse = await window.ezsite.apis.tablePage(6624, {
          PageNo: 1,
          PageSize: 1,
          Filters: [
          {
            name: "user_id",
            op: "Equal",
            value: user?.ID
          }]

        });

        if (profileResponse.error) throw profileResponse.error;

        // Fetch user activity
        const activityResponse = await window.ezsite.apis.tablePage(7227, {
          PageNo: 1,
          PageSize: 1,
          Filters: [
          {
            name: "user_id",
            op: "Equal",
            value: user?.ID
          }]

        });

        if (activityResponse.error) throw activityResponse.error;

        // Set profile data if exists
        if (profileResponse.data.List && profileResponse.data.List.length > 0) {
          const userProfile = profileResponse.data.List[0];
          setProfile(userProfile);
          setFullName(userProfile.full_name);
          setJobTitle(userProfile.job_title);
        } else {
          // Create a new profile if it doesn't exist
          if (user) {
            const newProfile = {
              user_id: user.ID,
              full_name: user.Name || '',
              job_title: '',
              profile_image: ''
            };

            const createResponse = await window.ezsite.apis.tableCreate(6624, newProfile);
            if (createResponse.error) throw createResponse.error;

            // Fetch the created profile
            const updatedProfileResponse = await window.ezsite.apis.tablePage(6624, {
              PageNo: 1,
              PageSize: 1,
              Filters: [
              {
                name: "user_id",
                op: "Equal",
                value: user.ID
              }]

            });

            if (updatedProfileResponse.error) throw updatedProfileResponse.error;
            if (updatedProfileResponse.data.List && updatedProfileResponse.data.List.length > 0) {
              setProfile(updatedProfileResponse.data.List[0]);
              setFullName(updatedProfileResponse.data.List[0].full_name);
              setJobTitle(updatedProfileResponse.data.List[0].job_title);
            }
          }
        }

        // Set activity data if exists or create new
        if (activityResponse.data.List && activityResponse.data.List.length > 0) {
          setActivity(activityResponse.data.List[0]);
        } else {
          // Create a new activity record if it doesn't exist
          if (user) {
            const newActivity = {
              user_id: user.ID,
              resume_count: 0,
              ats_check_count: 0,
              last_active: new Date().toISOString()
            };

            const createActivityResponse = await window.ezsite.apis.tableCreate(7227, newActivity);
            if (createActivityResponse.error) throw createActivityResponse.error;

            // Fetch the created activity
            const updatedActivityResponse = await window.ezsite.apis.tablePage(7227, {
              PageNo: 1,
              PageSize: 1,
              Filters: [
              {
                name: "user_id",
                op: "Equal",
                value: user.ID
              }]

            });

            if (updatedActivityResponse.error) throw updatedActivityResponse.error;
            if (updatedActivityResponse.data.List && updatedActivityResponse.data.List.length > 0) {
              setActivity(updatedActivityResponse.data.List[0]);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load profile data. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [isAuthenticated, navigate, user, toast]);

  const handleProfileUpdate = async () => {
    if (!profile) return;

    try {
      setIsUpdating(true);

      const updatedProfile = {
        ...profile,
        full_name: fullName,
        job_title: jobTitle
      };

      const response = await window.ezsite.apis.tableUpdate(6624, updatedProfile);
      if (response.error) throw response.error;

      setProfile(updatedProfile);

      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.'
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Update Failed',
        description: 'Failed to update your profile. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadProfileImage = async () => {
    if (!selectedFile || !profile) return;

    try {
      setUploadProgress(0);

      // Set up simulated progress updates
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 300);

      // Use the actual API for file upload
      const uploadResponse = await window.ezsite.apis.upload({
        filename: selectedFile.name,
        file: selectedFile
      });

      // Clear the progress interval and set to 100%
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (uploadResponse.error) throw new Error(uploadResponse.error);

      // Get the file ID from the response
      const storeFileId = uploadResponse.data;

      // Update profile with new image
      const updatedProfile = {
        ...profile,
        profile_image: storeFileId.toString()
      };

      const updateResponse = await window.ezsite.apis.tableUpdate(6624, updatedProfile);
      if (updateResponse.error) throw updateResponse.error;

      setProfile(updatedProfile);
      setSelectedFile(null);
      setUploadProgress(0);

      toast({
        title: 'Image Uploaded',
        description: 'Your profile image has been successfully uploaded.'
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: 'Upload Failed',
        description: 'Failed to upload profile image. Please try again.',
        variant: 'destructive'
      });
      setUploadProgress(0);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg">Loading profile...</span>
      </div>);

  }

  return (
    <div className="container max-w-4xl py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        {/* Profile sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={profile?.profile_image ? profile.profile_image : ''} alt={profile?.full_name || 'User'} />
                <AvatarFallback className="text-3xl">
                  <User className="h-16 w-16" />
                </AvatarFallback>
              </Avatar>
              
              <h2 className="text-xl font-semibold">{profile?.full_name || user?.Name || 'User'}</h2>
              <p className="text-muted-foreground">{profile?.job_title || 'No job title set'}</p>
              
              <div className="w-full mt-4">
                <Label htmlFor="profile-image" className="block mb-2">Upload Profile Image</Label>
                <Input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mb-2" />

                
                {uploadProgress > 0 &&
                <Progress value={uploadProgress} className="mb-2" />
                }
                
                <Button
                  onClick={uploadProfileImage}
                  disabled={!selectedFile}
                  className="w-full">

                  <Upload className="mr-2 h-4 w-4" />
                  Upload
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Activity Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Resumes Created:</span>
                  <span className="font-medium">{activity?.resume_count || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ATS Checks:</span>
                  <span className="font-medium">{activity?.ats_check_count || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Active:</span>
                  <span className="font-medium">
                    {activity?.last_active ?
                    new Date(activity.last_active).toLocaleDateString() :
                    'Today'}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate('/history')}>
                <History className="mr-2 h-4 w-4" />
                View History
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Main content */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input
                  id="full-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name" />

              </div>
              
              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input
                  id="job-title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Enter your job title" />

              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user?.Email || ''}
                  disabled
                  className="bg-muted" />

                <p className="text-xs text-muted-foreground">Email cannot be changed</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleProfileUpdate}
                disabled={isUpdating}
                className="ml-auto">

                {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto py-4 justify-start" onClick={() => navigate('/resume')}>
                    <FileText className="mr-2 h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Resume Builder</div>
                      <div className="text-xs text-muted-foreground">Create and edit your resumes</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto py-4 justify-start" onClick={() => navigate('/ats-checker')}>
                    <CheckSquare className="mr-2 h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">ATS Checker</div>
                      <div className="text-xs text-muted-foreground">Analyze your resume</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto py-4 justify-start" onClick={() => navigate('/history')}>
                    <History className="mr-2 h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">History</div>
                      <div className="text-xs text-muted-foreground">View your past activities</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>);

};

export default ProfilePage;