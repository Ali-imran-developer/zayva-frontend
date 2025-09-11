import { useBlogs } from '@/hooks/useBlogs';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Clock, Share2, BookOpen, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

const BlogDetail = () => {
  const { id } = useParams();
  const { isLoading, handleGetBlogDetail } = useBlogs();
  const { blogDetails } = useSelector((state) => state.Blogs);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if(id){
      handleGetBlogDetail(id);
    }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    let wordCount = content.description.split(' ').length;
    content.detail.forEach(section => {
      wordCount += section.subParagraph.split(' ').length;
      wordCount += section.points.join(' ').split(' ').length;
    });
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === blogDetails.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? blogDetails.images.length - 1 : prev - 1
    );
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blogDetails.heading,
          text: blogDetails.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <article className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(blogDetails.createdAt)}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {calculateReadTime(blogDetails)} min read
            </div>
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              2.4k views
            </div>
            <button 
              onClick={handleShare}
              className="flex items-center hover:text-blue-600 transition-colors ml-auto"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </button>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {blogDetails.heading}
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed">
            {blogDetails.description}
          </p>
        </header>

        {/* Image Gallery */}
        {blogDetails.images && blogDetails.images.length > 0 && (
          <div className="mb-12">
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="aspect-video relative">
                <img 
                  src={blogDetails.images[currentImageIndex]} 
                  alt={`Blog image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x450/e5e7eb/9ca3af?text=Image+Not+Available';
                  }}
                />
                
                {blogDetails.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all duration-200 shadow-lg"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all duration-200 shadow-lg"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                  </>
                )}
              </div>
              
              {blogDetails.images.length > 1 && (
                <div className="flex justify-center py-4 bg-gray-50">
                  {blogDetails.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full mx-1 transition-colors ${
                        index === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Blog Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {blogDetails.detail && blogDetails.detail.map((section, index) => (
            <section key={section._id} className={`${index !== 0 ? 'mt-12' : ''}`}>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
                  {index + 1}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {section.subheading}
                </h2>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-6 pl-12">
                {section.subParagraph}
              </p>

              {section.points && section.points.length > 0 && (
                <div className="pl-12">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                    Key Points:
                  </h3>
                  <div className="space-y-3">
                    {section.points.map((point, pointIndex) => (
                      <div key={pointIndex} className="flex items-start">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                          ✓
                        </div>
                        <p className="text-gray-700 leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Tags Section */}
        {blogDetails.tags && blogDetails.tags.length > 0 && (
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-3">
              {blogDetails.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Found this helpful?</h3>
          <p className="text-blue-100 mb-6">
            Subscribe to our newsletter for more insights on e-commerce trends and digital marketing strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe Now
            </button>
            <button 
              onClick={handleShare}
              className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Share Article
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;