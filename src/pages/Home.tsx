
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight, Bell, Gift, Award, Star, Zap, Target, Trophy, Flame, Target as TargetIcon, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CourseCarousel from '@/components/CourseCarousel';
import MysteryBoxDialog from '@/components/gamification/MysteryBoxDialog';
import SpinTheWheelDialog from '@/components/gamification/SpinTheWheelDialog';
import LearningStreakDialog from '@/components/LearningStreakDialog';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SkillsForRoleDialog from '@/components/SkillsForRoleDialog';
import { mockCoursesData } from '@/data/mockData';
import { useIsMobile } from '@/hooks/use-mobile';
import TopicsCatalog from '@/components/TopicsCatalog';

// Define academies and sub-academies
const academyFilters = ['All Academies', 'Leadership Academy', 'Data Academy', 'Marketing Academy', 'PM Academy', 'Innovation Academy'];
const subAcademyFilters = {
  'All Academies': ['All Sub-Academies'],
  'Leadership Academy': ['All Sub-Academies', 'Foundational', 'Advanced', 'Executive'],
  'Data Academy': ['All Sub-Academies', 'Technical', 'Analytics', 'Machine Learning'],
  'Marketing Academy': ['All Sub-Academies', 'Digital', 'Content', 'Strategy', 'Specialized'],
  'PM Academy': ['All Sub-Academies', 'Agile', 'Traditional', 'Certification'],
  'Innovation Academy': ['All Sub-Academies', 'Design Thinking', 'Advanced', 'Specialized'],
};

const roleSkills = [
  { id: 1, name: 'Project Management', proficiency: 65, target: 80 },
  { id: 2, name: 'Leadership', proficiency: 60, target: 75 },
  { id: 3, name: 'Strategic Thinking', proficiency: 45, target: 70 },
  { id: 4, name: 'Communication', proficiency: 85, target: 85 },
  { id: 5, name: 'Data Analysis', proficiency: 30, target: 60 },
];

const skillsYouFollow = [
  { id: 1, name: 'JavaScript', proficiency: 75 },
  { id: 2, name: 'Product Management', proficiency: 60 },
  { id: 3, name: 'UI/UX Design', proficiency: 45 },
  { id: 4, name: 'DevOps', proficiency: 30 },
  { id: 5, name: 'Cloud Architecture', proficiency: 50 },
];

const Home = () => {
  const navigate = useNavigate();
  const [isMysteryBoxOpen, setIsMysteryBoxOpen] = useState(false);
  const [isSpinWheelOpen, setIsSpinWheelOpen] = useState(false);
  const [isStreakDialogOpen, setIsStreakDialogOpen] = useState(false);
  const [isSkillsForRoleOpen, setIsSkillsForRoleOpen] = useState(false);
  const [skillsTab, setSkillsTab] = useState('follow');
  const [selectedAcademy, setSelectedAcademy] = useState('All Academies');
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  
  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleContinueLearningViewAll = () => {
    navigate('/my-learning', { state: { activeTab: 'courses', courseTab: 'in-progress' } });
  };

  const handleViewAllCategory = (category: string) => {
    navigate(`/view-all/${category.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleViewActionables = () => {
    navigate('/actionables');
  };

  const handleViewRewards = () => {
    navigate('/my-learning', { state: { activeTab: 'rewards' } });
  };

  const handleViewMilestones = () => {
    navigate('/milestones');
  };

  const handleDiscoverClick = () => {
    navigate('/discover');
  };

  const handleViewLearningGoals = () => {
    navigate('/my-learning', { state: { activeTab: 'goals' } });
  };

  return (
    <>
      <Helmet>
        <title>Home | Learning Management System</title>
      </Helmet>
      <div className="container py-8 space-y-12 mb-20">
        <section className="relative rounded-xl overflow-hidden max-w-full mx-auto">
          <div className="bg-gradient-to-r from-primary via-primary/90 to-accent py-3 px-6 md:px-8">
            <div className="max-w-xl space-y-2">
              <h1 className="text-xl md:text-2xl font-bold text-white">
                Unlock Your Potential with Personalized Learning
              </h1>
              <form onSubmit={handleSearch} className="flex gap-2 pt-1">
                <Input 
                  type="text" 
                  placeholder="Search for courses, skills, topics..." 
                  className="bg-white/95 border-0 focus-visible:ring-white" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" className="bg-white text-primary hover:bg-white/90">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
              <div className="flex flex-wrap gap-3 pt-1 pb-1">
                <Button 
                  size="sm" 
                  className="gap-1 bg-white text-primary hover:bg-white/90" 
                  onClick={handleDiscoverClick}
                >
                  Explore Courses
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
                <Button 
                  size="sm"
                  variant="outline" 
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                  onClick={handleViewLearningGoals}
                >
                  View Learning Goals
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1')] bg-cover bg-center opacity-20"></div>
          
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/20 rounded-full translate-y-1/3 -translate-x-1/3 blur-xl"></div>
        </section>

        <section className="space-y-12">
          <CourseCarousel 
            title="Continue Learning" 
            courses={mockCoursesData.usageHistory} 
            onCourseClick={handleCourseClick}
            onViewAllClick={handleContinueLearningViewAll}
          />
          
          <CourseCarousel 
            title="Assigned Courses" 
            courses={mockCoursesData.roleBasedSkillGaps.map(course => ({
              ...course
            }))} 
            showSkillFilters={true}
            onCourseClick={handleCourseClick}
            onViewAllClick={() => handleViewAllCategory('Assigned Courses')}
            filterOptions={['All Categories', 'Ready for Role', 'Mandatory', 'Leadership', 'Technical']}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-all">
              <div className="h-2 bg-purple-500"></div>
              <div className="p-6">
                <Tabs value={skillsTab} onValueChange={setSkillsTab}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-purple-50 p-1.5 rounded-lg">
                        <Star className="h-5 w-5 text-purple-500" />
                      </div>
                      <h3 className="text-lg font-semibold">Skills</h3>
                    </div>
                    <TabsList>
                      <TabsTrigger value="follow" className="text-xs">You Follow</TabsTrigger>
                      <TabsTrigger value="role" className="text-xs">For Your Role</TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="follow">
                    <div className="space-y-4">
                      {skillsYouFollow.map(skill => (
                        <div key={skill.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-xs bg-secondary/80 px-2 py-0.5 rounded-full">
                              {skill.proficiency}%
                            </span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-primary"
                              style={{ width: `${skill.proficiency}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" className="w-full mt-2">
                        View All Skills You Follow
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="role">
                    <div className="space-y-4">
                      {roleSkills.slice(0, 3).map(skill => (
                        <div key={skill.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className="text-xs bg-secondary/80 px-2 py-0.5 rounded-full">
                              {skill.proficiency}% / {skill.target}%
                            </span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${skill.proficiency >= skill.target ? 'bg-green-500' : 'bg-primary'}`}
                              style={{ width: `${(skill.proficiency / skill.target) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-2 gap-2"
                        onClick={() => setIsSkillsForRoleOpen(true)}
                      >
                        <TargetIcon className="h-4 w-4" />
                        View All Role Skills
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-all">
              <div className="h-2 bg-blue-500"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-50 p-1.5 rounded-lg">
                      <Bell className="h-5 w-5 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-semibold">Actionables</h3>
                  </div>
                  <Button 
                    variant="link" 
                    className="gap-1 text-primary text-sm p-0"
                    onClick={handleViewActionables}
                  >
                    View All <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors">
                    <div>
                      <p className="font-medium">Complete Leadership Course</p>
                      <p className="text-sm text-muted-foreground">3 days remaining</p>
                    </div>
                    <Button size="sm">Resume</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors">
                    <div>
                      <p className="font-medium">Rate Marketing Strategy Course</p>
                      <p className="text-sm text-muted-foreground">Feedback requested</p>
                    </div>
                    <Button size="sm" variant="outline">Rate</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-all">
              <div className="h-2 bg-amber-500"></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-amber-50 p-1.5 rounded-lg">
                      <Gift className="h-5 w-5 text-amber-500" />
                    </div>
                    <h3 className="text-lg font-semibold">My Rewards</h3>
                  </div>
                  <Button 
                    variant="link" 
                    className="gap-1 text-primary text-sm p-0"
                    onClick={handleViewRewards}
                  >
                    View All <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg bg-secondary/10">
                      <Award className="h-8 w-8 text-amber-500" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total Points</p>
                        <p className="text-xl font-bold">2,450</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg bg-secondary/10">
                      <div className="relative">
                        <Trophy className="h-8 w-8 text-primary" />
                        <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-500 text-white text-xs flex items-center justify-center font-bold">
                          8
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Rank</p>
                        <p className="text-xl font-bold">#42</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-50 p-2 rounded-lg">
                        <Flame className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-medium">Learning Streak</p>
                        <p className="text-sm text-muted-foreground">18 days streak</p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setIsStreakDialogOpen(true)}
                    >
                      View Details
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-50 p-2 rounded-lg">
                        <TargetIcon className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="font-medium">Next Milestone</p>
                        <p className="text-sm text-muted-foreground">2,535 points to Gold</p>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleViewMilestones}
                    >
                      View All
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="secondary" 
                      className="flex items-center gap-2"
                      onClick={() => setIsMysteryBoxOpen(true)}
                    >
                      <div className="relative">
                        <Gift className="h-5 w-5 text-purple-500" />
                        <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                      </div>
                      <span>Mystery Box</span>
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="flex items-center gap-2"
                      onClick={() => setIsSpinWheelOpen(true)}
                    >
                      <Zap className="h-5 w-5 text-amber-500" />
                      <span>Spin the Wheel</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <CourseCarousel 
            title="Chosen For You" 
            courses={mockCoursesData.chosenForMe || []} 
            onCourseClick={handleCourseClick}
            onViewAllClick={() => handleViewAllCategory('Chosen For You')}
          />
          
          <CourseCarousel 
            title="Skills For Your Job Role" 
            courses={mockCoursesData.skillsForJobRole || []} 
            showSkillFilters={true}
            onCourseClick={handleCourseClick}
            onViewAllClick={() => handleViewAllCategory('Skills For Your Job Role')}
            filterOptions={['All Skills', 'Leadership', 'Management', 'Technical', 'Critical Thinking', 'Problem Solving', 'Strategy']}
          />
          
          <CourseCarousel 
            title="Based On Your Interest" 
            courses={mockCoursesData.basedOnInterest || []} 
            showSkillFilters={true}
            onCourseClick={handleCourseClick}
            onViewAllClick={() => handleViewAllCategory('Based On Your Interest')}
            filterOptions={['All Skills', 'Marketing', 'Design', 'Programming', 'Product Management', 'Writing']}
          />
          
          <CourseCarousel 
            title="Academy Courses" 
            courses={mockCoursesData.academyCourses || []} 
            showSkillFilters={true}
            onCourseClick={handleCourseClick}
            onViewAllClick={() => handleViewAllCategory('Academy Courses')}
            filterOptions={academyFilters}
            subFilterOptions={subAcademyFilters}
          />
          
          <CourseCarousel 
            title="Popular with Similar Learners" 
            courses={mockCoursesData.similarUsers} 
            onCourseClick={handleCourseClick}
            onViewAllClick={() => handleViewAllCategory('Popular with Similar Learners')}
          />
          
          <CourseCarousel 
            title="Trending Now" 
            courses={mockCoursesData.trendingCourses} 
            onCourseClick={handleCourseClick}
            onViewAllClick={() => handleViewAllCategory('Trending Now')}
          />
          
          <CourseCarousel 
            title="Newly Added" 
            courses={mockCoursesData.newCourses} 
            onCourseClick={handleCourseClick}
            onViewAllClick={() => handleViewAllCategory('Newly Added')}
          />
          
          {/* HR Banner at the bottom */}
          <div className="border rounded-xl overflow-hidden">
            <div className="bg-primary/10 p-4 md:p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">HR Communications</h3>
                  <p className="text-muted-foreground">Important updates and announcements from HR</p>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  View All
                </Button>
              </div>
              
              <div className="mt-4">
                <Carousel>
                  <CarouselContent>
                    <CarouselItem>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2">New Training Policy Update</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Starting next month, all employees will have dedicated learning hours each week.
                          </p>
                          <Button size="sm" variant="link" className="p-0">Read more</Button>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                    <CarouselItem>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2">Annual Performance Reviews</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Annual performance reviews will begin on July 15th. Please complete all pending courses.
                          </p>
                          <Button size="sm" variant="link" className="p-0">Read more</Button>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                    <CarouselItem>
                      <Card>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2">Leadership Summit 2023</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Registration for the Leadership Summit is now open. Limited spots available.
                          </p>
                          <Button size="sm" variant="link" className="p-0">Read more</Button>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </div>
          
          {/* Topics Catalog */}
          <TopicsCatalog />
        </section>
      </div>
      
      <MysteryBoxDialog open={isMysteryBoxOpen} onOpenChange={setIsMysteryBoxOpen} />
      <SpinTheWheelDialog open={isSpinWheelOpen} onOpenChange={setIsSpinWheelOpen} />
      <LearningStreakDialog open={isStreakDialogOpen} onOpenChange={setIsStreakDialogOpen} />
      <SkillsForRoleDialog 
        open={isSkillsForRoleOpen} 
        onOpenChange={setIsSkillsForRoleOpen} 
        skills={roleSkills}
      />
    </>
  );
};

// Import the necessary components for the HR banner
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

export default Home;
