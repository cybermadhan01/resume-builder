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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  FileText,
  CheckSquare,
  Loader2,
  Eye,
  Download,
  Trash2,
  Calendar,
  Clock } from
'lucide-react';
import { format } from 'date-fns';

interface Resume {
  id: number;
  user_id: string;
  title: string;
  template: string;
  content: string;
  last_modified: string;
  thumbnail: string;
}

interface ATSCheck {
  id: number;
  user_id: string;
  resume_id: string;
  job_description: string;
  score: number;
  feedback: string;
  check_date: string;
}

const HistoryPage = () => {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [atsChecks, setAtsChecks] = useState<ATSCheck[]>([]);
  const [isLoadingResumes, setIsLoadingResumes] = useState(true);
  const [isLoadingATS, setIsLoadingATS] = useState(true);
  const [activeTab, setActiveTab] = useState('resumes');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    const fetchUserData = async () => {
      try {
        // Fetch user resumes
        setIsLoadingResumes(true);
        const resumesResponse = await window.ezsite.apis.tablePage(6625, {
          PageNo: 1,
          PageSize: 50,
          OrderByField: "last_modified",
          IsAsc: false,
          Filters: [
          {
            name: "user_id",
            op: "Equal",
            value: user?.ID
          }]

        });

        if (resumesResponse.error) throw resumesResponse.error;
        setResumes(resumesResponse.data.List || []);
        setIsLoadingResumes(false);

        // Fetch ATS checks
        setIsLoadingATS(true);
        const atsResponse = await window.ezsite.apis.tablePage(6626, {
          PageNo: 1,
          PageSize: 50,
          OrderByField: "check_date",
          IsAsc: false,
          Filters: [
          {
            name: "user_id",
            op: "Equal",
            value: user?.ID
          }]

        });

        if (atsResponse.error) throw atsResponse.error;
        setAtsChecks(atsResponse.data.List || []);
        setIsLoadingATS(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your history. Please try again.',
          variant: 'destructive'
        });
      }
    };

    fetchUserData();
  }, [isAuthenticated, navigate, user, toast]);

  const handleDeleteResume = async (resumeId: number) => {
    if (!confirm('Are you sure you want to delete this resume?')) return;

    try {
      const response = await window.ezsite.apis.tableDelete(6625, { ID: resumeId });
      if (response.error) throw response.error;

      // Remove the deleted resume from state
      setResumes(resumes.filter((resume) => resume.id !== resumeId));

      toast({
        title: 'Resume Deleted',
        description: 'Your resume has been successfully deleted.'
      });
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast({
        title: 'Delete Failed',
        description: 'Failed to delete the resume. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleDeleteATSCheck = async (checkId: number) => {
    if (!confirm('Are you sure you want to delete this ATS check?')) return;

    try {
      const response = await window.ezsite.apis.tableDelete(6626, { ID: checkId });
      if (response.error) throw response.error;

      // Remove the deleted check from state
      setAtsChecks(atsChecks.filter((check) => check.id !== checkId));

      toast({
        title: 'ATS Check Deleted',
        description: 'Your ATS check has been successfully deleted.'
      });
    } catch (error) {
      console.error('Error deleting ATS check:', error);
      toast({
        title: 'Delete Failed',
        description: 'Failed to delete the ATS check. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const viewResume = (resumeId: number) => {
    navigate(`/resume?id=${resumeId}`);
  };

  const viewATSCheck = (checkId: number) => {
    navigate(`/ats-checker?id=${checkId}`);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return 'Invalid date';
    }
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'h:mm a');
    } catch (e) {
      return '';
    }
  };

  const getTemplateName = (templateKey: string) => {
    const templates: {[key: string]: string;} = {
      'basic': 'Basic Template',
      'modern': 'Modern Template',
      'professional': 'Professional Template'
    };
    return templates[templateKey] || templateKey;
  };

  return (
    <div className="container max-w-6xl py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">My History</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="resumes">
            <FileText className="mr-2 h-4 w-4" />
            My Resumes
          </TabsTrigger>
          <TabsTrigger value="ats">
            <CheckSquare className="mr-2 h-4 w-4" />
            ATS Checks
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="resumes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Resumes</CardTitle>
              <CardDescription>
                View and manage all your saved resumes
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingResumes ?
              <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Loading your resumes...</span>
                </div> :
              resumes.length === 0 ?
              <div className="text-center py-10">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No resumes found</h3>
                  <p className="text-muted-foreground mb-4">You haven't created any resumes yet.</p>
                  <Button onClick={() => navigate('/resume')}>Create Resume</Button>
                </div> :

              <div className="space-y-4">
                  {resumes.map((resume) =>
                <Card key={resume.id} className="overflow-hidden">
                      <div className="md:flex">
                        {resume.thumbnail &&
                    <div className="md:w-1/4 bg-muted">
                            <img
                        src={`/api/file/${resume.thumbnail}`}
                        alt={resume.title}
                        className="object-cover w-full h-full" />

                          </div>
                    }
                        <div className="md:w-3/4 p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-bold">{resume.title}</h3>
                              <div className="flex items-center mt-1 space-x-2">
                                <Badge variant="outline">{getTemplateName(resume.template)}</Badge>
                                <span className="text-sm text-muted-foreground">
                                  <Calendar className="inline h-3 w-3 mr-1" />
                                  {formatDate(resume.last_modified)}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  <Clock className="inline h-3 w-3 mr-1" />
                                  {formatTime(resume.last_modified)}
                                </span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                            variant="outline"
                            size="sm"
                            onClick={() => viewResume(resume.id)}>

                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteResume(resume.id)}>

                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                )}
                </div>
              }
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate('/')}>Back to Home</Button>
              <Button onClick={() => navigate('/resume')}>Create New Resume</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="ats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>ATS Checks</CardTitle>
              <CardDescription>
                View and manage your ATS compatibility checks
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingATS ?
              <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Loading your ATS checks...</span>
                </div> :
              atsChecks.length === 0 ?
              <div className="text-center py-10">
                  <CheckSquare className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No ATS checks found</h3>
                  <p className="text-muted-foreground mb-4">You haven't performed any ATS compatibility checks yet.</p>
                  <Button onClick={() => navigate('/ats-checker')}>Check Resume</Button>
                </div> :

              <div className="space-y-4">
                  {atsChecks.map((check) =>
                <Card key={check.id}>
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                          <div className="space-y-2 mb-4 md:mb-0">
                            <div className="flex items-center">
                              <span className="text-lg font-semibold">ATS Check #{check.id}</span>
                              <Badge className={`ml-3 ${getScoreColor(check.score)}`}>
                                Score: {check.score}%
                              </Badge>
                            </div>
                            
                            <div className="text-sm text-muted-foreground">
                              <span className="inline-flex items-center mr-3">
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(check.check_date)}
                              </span>
                              <span className="inline-flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {formatTime(check.check_date)}
                              </span>
                            </div>
                            
                            <div className="text-sm max-w-xl">
                              <span className="font-medium">Job Description:</span>
                              <p className="line-clamp-2">{check.job_description}</p>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2 w-full md:w-auto">
                            <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 md:flex-none"
                          onClick={() => viewATSCheck(check.id)}>

                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button
                          variant="destructive"
                          size="sm"
                          className="flex-1 md:flex-none"
                          onClick={() => handleDeleteATSCheck(check.id)}>

                              <Trash2 className="h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                )}
                </div>
              }
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => navigate('/')}>Back to Home</Button>
              <Button onClick={() => navigate('/ats-checker')}>New ATS Check</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>);

};

export default HistoryPage;