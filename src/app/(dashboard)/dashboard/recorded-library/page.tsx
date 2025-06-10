'use client';

import { useState, useEffect } from 'react';
import { Play, Lock, Clock, Eye, Filter, Search, Star, Users, Calendar } from 'lucide-react';
import VideoGrid from './components/VideoGrid';
import CategoryFilter from './components/CategoryFilter';
import VideoPlayer from './components/VideoPlayer';
import PreviewMode from './components/PreviewMode';

interface RecordedSession {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // in minutes
  category: string;
  counselor: {
    name: string;
    image: string;
  };
  date: string;
  views: number;
  rating: number;
  isPremium: boolean;
  tags: string[];
  participants: number;
  transcript?: string;
}

const recordedSessions: RecordedSession[] = [
  {
    id: '1',
    title: 'Communication Strategies for Couples',
    description: 'Learn effective communication techniques to strengthen your relationship and resolve conflicts constructively.',
    thumbnail: '/api/placeholder/400/225',
    duration: 65,
    category: 'marriage',
    counselor: {
      name: 'Dr. Sarah Johnson',
      image: '/api/placeholder/50/50'
    },
    date: '2024-06-05',
    views: 234,
    rating: 4.8,
    isPremium: true,
    tags: ['communication', 'conflict resolution', 'relationships'],
    participants: 12
  },
  {
    id: '2',
    title: 'Managing Anxiety in Daily Life',
    description: 'Practical techniques and strategies for managing anxiety and building resilience in everyday situations.',
    thumbnail: '/api/placeholder/400/225',
    duration: 45,
    category: 'individual',
    counselor: {
      name: 'Dr. Michael Chen',
      image: '/api/placeholder/50/50'
    },
    date: '2024-06-03',
    views: 156,
    rating: 4.9,
    isPremium: false,
    tags: ['anxiety', 'coping strategies', 'mental health'],
    participants: 8
  },
  {
    id: '3',
    title: 'Positive Parenting Techniques',
    description: 'Evidence-based parenting strategies to build stronger connections with your children and promote healthy development.',
    thumbnail: '/api/placeholder/400/225',
    duration: 75,
    category: 'parenting',
    counselor: {
      name: 'Dr. Lisa Rodriguez',
      image: '/api/placeholder/50/50'
    },
    date: '2024-06-01',
    views: 189,
    rating: 4.7,
    isPremium: true,
    tags: ['parenting', 'child development', 'discipline'],
    participants: 15
  },
  {
    id: '4',
    title: 'Breaking Free from Addiction',
    description: 'Understanding addiction patterns and developing sustainable recovery strategies with professional guidance.',
    thumbnail: '/api/placeholder/400/225',
    duration: 90,
    category: 'addiction',
    counselor: {
      name: 'Dr. James Wilson',
      image: '/api/placeholder/50/50'
    },
    date: '2024-05-30',
    views: 98,
    rating: 4.9,
    isPremium: true,
    tags: ['addiction', 'recovery', 'support'],
    participants: 6
  },
  {
    id: '5',
    title: 'Family Conflict Resolution',
    description: 'Strategies for addressing family conflicts and improving communication between family members.',
    thumbnail: '/api/placeholder/400/225',
    duration: 60,
    category: 'family',
    counselor: {
      name: 'Dr. Emma Thompson',
      image: '/api/placeholder/50/50'
    },
    date: '2024-05-28',
    views: 145,
    rating: 4.6,
    isPremium: false,
    tags: ['family therapy', 'conflict resolution', 'communication'],
    participants: 10
  },
  {
    id: '6',
    title: 'Building Self-Esteem and Confidence',
    description: 'Techniques for developing a positive self-image and building lasting confidence in personal and professional life.',
    thumbnail: '/api/placeholder/400/225',
    duration: 50,
    category: 'individual',
    counselor: {
      name: 'Dr. Robert Davis',
      image: '/api/placeholder/50/50'
    },
    date: '2024-05-25',
    views: 203,
    rating: 4.8,
    isPremium: true,
    tags: ['self-esteem', 'confidence', 'personal growth'],
    participants: 9
  }
];

export default function RecordedLibraryPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<RecordedSession | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [userSubscription, setUserSubscription] = useState<'free' | 'premium'>('free');
  const [filteredSessions, setFilteredSessions] = useState(recordedSessions);

  useEffect(() => {
    let filtered = recordedSessions;

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(session => selectedCategories.includes(session.category));
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(session =>
        session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredSessions(filtered);
  }, [selectedCategories, searchQuery]);

  const handleVideoSelect = (video: RecordedSession) => {
    setSelectedVideo(video);
    if (video.isPremium && userSubscription === 'free') {
      setIsPreviewMode(true);
    } else {
      setIsPreviewMode(false);
    }
  };

  const handleUpgradeSubscription = () => {
    // Simulate subscription upgrade
    setUserSubscription('premium');
    setIsPreviewMode(false);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Recorded Library</h1>
              <p className="mt-2 text-gray-600">Access our collection of recorded counseling sessions and educational content</p>
            </div>
            {userSubscription === 'free' && (
              <button
                onClick={handleUpgradeSubscription}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upgrade to Premium
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Category Filter */}
          <div className="lg:w-80 flex-shrink-0">
            <CategoryFilter
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search sessions, topics, or counselors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Subscription Status */}
            {userSubscription === 'free' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">Free Plan - Limited Access</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      You can preview premium content for 3 minutes. Upgrade to access full sessions.
                    </p>
                  </div>
                  <button
                    onClick={handleUpgradeSubscription}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Upgrade Now
                  </button>
                </div>
              </div>
            )}

            {/* Results Summary */}
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                Showing {filteredSessions.length} of {recordedSessions.length} sessions
              </p>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleVideoSelect(session)}
                >
                  {/* Thumbnail */}
                  <div className="relative">
                    <img
                      src={session.thumbnail}
                      alt={session.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                    {session.isPremium && (
                      <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Premium
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDuration(session.duration)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{session.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{session.description}</p>

                    {/* Counselor Info */}
                    <div className="flex items-center gap-2 mb-3">
                      <img
                        src={session.counselor.image}
                        alt={session.counselor.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-gray-700">{session.counselor.name}</span>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(session.date)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {session.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {session.participants}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {session.rating}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {session.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredSessions.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}

            {/* Alternative: Use VideoGrid Component */}
            {/* You can replace the grid above with this if you prefer to use the VideoGrid component */}
            {/* <VideoGrid /> */}
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {isPreviewMode ? (
              <PreviewMode
                video={selectedVideo}
                onClose={() => setSelectedVideo(null)}
                onUpgrade={handleUpgradeSubscription}
              />
            ) : (
              <VideoPlayer
                video={selectedVideo}
                onClose={() => setSelectedVideo(null)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}