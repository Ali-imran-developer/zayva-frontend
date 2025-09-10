import React from 'react';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';

const blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React Hooks",
      excerpt: "Learn how to use React Hooks to manage state and side effects in your functional components effectively.",
      author: "Sarah Johnson",
      date: "2024-03-15",
      readTime: "5 min read",
      category: "Development",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      tags: ["React", "JavaScript", "Frontend"]
    },
    {
      id: 2,
      title: "The Future of Web Development",
      excerpt: "Explore emerging trends and technologies that are shaping the future of web development in 2024 and beyond.",
      author: "Mike Chen",
      date: "2024-03-12",
      readTime: "8 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop",
      tags: ["Web Development", "AI", "Trends"]
    },
    {
      id: 3,
      title: "Building Responsive Layouts",
      excerpt: "Master the art of creating responsive layouts that work seamlessly across all devices and screen sizes.",
      author: "Emily Rodriguez",
      date: "2024-03-10",
      readTime: "6 min read",
      category: "Design",
      image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=400&h=250&fit=crop",
      tags: ["CSS", "Responsive", "UI/UX"]
    },
    {
      id: 4,
      title: "JavaScript Performance Tips",
      excerpt: "Discover proven techniques to optimize your JavaScript code and improve application performance significantly.",
      author: "David Kim",
      date: "2024-03-08",
      readTime: "7 min read",
      category: "Development",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop",
      tags: ["JavaScript", "Performance", "Optimization"]
    },
    {
      id: 5,
      title: "Modern CSS Techniques",
      excerpt: "Explore advanced CSS features and techniques that will elevate your styling skills to the next level.",
      author: "Lisa Thompson",
      date: "2024-03-06",
      readTime: "5 min read",
      category: "Design",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      tags: ["CSS", "Modern", "Styling"]
    },
    {
      id: 6,
      title: "Database Design Best Practices",
      excerpt: "Learn essential database design principles that ensure scalability, performance, and data integrity.",
      author: "James Wilson",
      date: "2024-03-04",
      readTime: "9 min read",
      category: "Backend",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
      tags: ["Database", "SQL", "Architecture"]
    },
    {
      id: 7,
      title: "API Development with Node.js",
      excerpt: "Build robust and scalable APIs using Node.js and Express with industry-standard practices and patterns.",
      author: "Anna Martinez",
      date: "2024-03-02",
      readTime: "10 min read",
      category: "Backend",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop",
      tags: ["Node.js", "API", "Express"]
    },
    {
      id: 8,
      title: "Mobile-First Development",
      excerpt: "Understand the mobile-first approach and how it can improve user experience across all devices.",
      author: "Robert Garcia",
      date: "2024-02-28",
      readTime: "6 min read",
      category: "Mobile",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop",
      tags: ["Mobile", "Development", "UX"]
    },
    {
      id: 9,
      title: "Testing Strategies for React Apps",
      excerpt: "Comprehensive guide to testing React applications using modern tools and best practices for quality assurance.",
      author: "Sophie Brown",
      date: "2024-02-26",
      readTime: "8 min read",
      category: "Testing",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      tags: ["Testing", "React", "Quality"]
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Development': 'bg-blue-100 text-blue-800',
      'Technology': 'bg-purple-100 text-purple-800',
      'Design': 'bg-green-100 text-green-800',
      'Backend': 'bg-orange-100 text-orange-800',
      'Mobile': 'bg-pink-100 text-pink-800',
      'Testing': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover insights, tutorials, and industry best practices from our team of experts
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-8 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts?.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:-translate-y-2">
              <div className="relative overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <div className="flex items-center mr-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(post.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime}
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">
                      +{post.tags.length - 2}
                    </span>
                  )}
                </div>

                {/* Author and Read More */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {post.author}
                    </span>
                  </div>
                  
                  <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200 group/btn">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
};

export default blogs;