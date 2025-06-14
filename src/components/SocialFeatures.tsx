
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Share2, 
  MessageCircle, 
  Trophy, 
  Target, 
  TrendingUp,
  Heart,
  Send
} from 'lucide-react';

const SocialFeatures: React.FC = () => {
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [newPost, setNewPost] = useState('');
  const { toast } = useToast();

  // Mock data - in real app, this would come from backend
  const leaderboard = [
    { id: 1, name: 'Sarah K.', savings: 45000, streak: 15, avatar: '👩‍💼' },
    { id: 2, name: 'Mike R.', savings: 38000, streak: 12, avatar: '👨‍💻' },
    { id: 3, name: 'You', savings: 32000, streak: 8, avatar: '🎯' },
    { id: 4, name: 'Lisa M.', savings: 28000, streak: 6, avatar: '👩‍🎨' },
    { id: 5, name: 'John D.', savings: 25000, streak: 4, avatar: '👨‍🔧' },
  ];

  const challenges = [
    {
      id: 1,
      title: 'No Coffee Challenge',
      description: 'Skip coffee purchases for a week',
      participants: 234,
      reward: 500,
      duration: '5 days left',
      joined: false
    },
    {
      id: 2,
      title: 'Cook at Home',
      description: 'Prepare all meals at home for 10 days',
      participants: 156,
      reward: 1000,
      duration: '8 days left',
      joined: true
    },
    {
      id: 3,
      title: 'Transport Saver',
      description: 'Use public transport instead of rides',
      participants: 89,
      reward: 750,
      duration: '12 days left',
      joined: false
    }
  ];

  const communityPosts = [
    {
      id: 1,
      author: 'Alex T.',
      avatar: '👨‍🚀',
      content: 'Just hit my first ₹50,000 savings goal! The budget tracking really helped me stay on track. 🎉',
      likes: 24,
      comments: 8,
      timeAgo: '2h ago',
      liked: false
    },
    {
      id: 2,
      author: 'Priya S.',
      avatar: '👩‍🎓',
      content: 'Pro tip: I set up automatic transfers to my savings account right after payday. Makes saving effortless!',
      likes: 31,
      comments: 12,
      timeAgo: '4h ago',
      liked: true
    },
    {
      id: 3,
      author: 'Rahul K.',
      avatar: '👨‍🍳',
      content: 'Month 3 of cooking at home instead of ordering out. Saved ₹15,000 already! 💪',
      likes: 18,
      comments: 5,
      timeAgo: '6h ago',
      liked: false
    }
  ];

  const handleJoinChallenge = (challengeId: number) => {
    toast({
      title: "Challenge Joined!",
      description: "Good luck with your savings challenge!",
    });
  };

  const handleSharePost = () => {
    if (!newPost.trim()) return;
    
    toast({
      title: "Post Shared!",
      description: "Your achievement has been shared with the community.",
    });
    setNewPost('');
  };

  const renderLeaderboard = () => (
    <div className="space-y-3">
      {leaderboard.map((user, index) => (
        <div key={user.id} className="glass-card p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg ${
              index === 0 ? 'bg-yellow-500/20' : 
              index === 1 ? 'bg-gray-400/20' : 
              index === 2 ? 'bg-amber-600/20' : 'bg-white/10'
            }`}>
              {user.avatar}
            </div>
            <div>
              <h3 className={`font-medium ${user.name === 'You' ? 'text-primary' : 'text-white'}`}>
                {user.name}
              </h3>
              <p className="text-gray-400 text-sm">
                {user.streak} day streak
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white font-bold">₹{user.savings.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-gray-400 text-sm">
              <Trophy className="w-3 h-3" />
              #{index + 1}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderChallenges = () => (
    <div className="space-y-4">
      {challenges.map((challenge) => (
        <div key={challenge.id} className="glass-card p-4 rounded-lg space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-white font-medium">{challenge.title}</h3>
              <p className="text-gray-400 text-sm">{challenge.description}</p>
            </div>
            <Badge variant="secondary" className="text-xs">
              ₹{challenge.reward}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {challenge.participants}
              </span>
              <span>{challenge.duration}</span>
            </div>
            
            <Button
              onClick={() => handleJoinChallenge(challenge.id)}
              disabled={challenge.joined}
              variant={challenge.joined ? "secondary" : "default"}
              size="sm"
              className={challenge.joined ? "" : "bg-gradient-to-r from-primary to-accent text-black"}
            >
              {challenge.joined ? "Joined" : "Join"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCommunity = () => (
    <div className="space-y-4">
      {/* Create Post */}
      <div className="glass-card p-4 rounded-lg space-y-3">
        <Textarea
          placeholder="Share your financial wins or tips with the community..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="glass-card border-white/20 text-white placeholder:text-gray-400 resize-none"
          rows={3}
        />
        <Button
          onClick={handleSharePost}
          disabled={!newPost.trim()}
          className="w-full bg-gradient-to-r from-primary to-accent text-black hover:opacity-80"
        >
          <Send className="w-4 h-4 mr-2" />
          Share with Community
        </Button>
      </div>

      {/* Community Posts */}
      {communityPosts.map((post) => (
        <div key={post.id} className="glass-card p-4 rounded-lg space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lg">
              {post.avatar}
            </div>
            <div>
              <h4 className="text-white font-medium">{post.author}</h4>
              <p className="text-gray-400 text-xs">{post.timeAgo}</p>
            </div>
          </div>
          
          <p className="text-white text-sm">{post.content}</p>
          
          <div className="flex items-center gap-4 pt-2">
            <button className={`flex items-center gap-1 text-sm ${
              post.liked ? 'text-red-400' : 'text-gray-400'
            } hover:text-red-400 transition-colors`}>
              <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
              {post.likes}
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
              <MessageCircle className="w-4 h-4" />
              {post.comments}
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Card className="glass-card border-white/20">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
          👥 Community
        </CardTitle>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white/5 p-1 rounded-lg">
          {[
            { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
            { id: 'challenges', label: 'Challenges', icon: Target },
            { id: 'community', label: 'Feed', icon: MessageCircle }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </CardHeader>
      
      <CardContent>
        {activeTab === 'leaderboard' && renderLeaderboard()}
        {activeTab === 'challenges' && renderChallenges()}
        {activeTab === 'community' && renderCommunity()}
      </CardContent>
    </Card>
  );
};

export default SocialFeatures;
