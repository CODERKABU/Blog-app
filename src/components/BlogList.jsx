import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function BlogList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const posts = response.data.slice(0, 12).map(post => ({
          id: post.id,
          title: post.title,
          description: post.body,
          urlToImage: `https://picsum.photos/seed/${post.id}/300/200`,
          author: `Author ${post.userId}`,
          publishedAt: new Date().toISOString()
        }));
        setArticles(posts);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center m-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4" data-bs-theme="dark">
      <h2 className="mb-4">{category ? `${category.charAt(0).toUpperCase() + category.slice(1)} News` : 'Latest News'}</h2>
      <div className="row">
        {articles.map((article) => (
          <div className="col-md-4 mb-4" key={article.id}>
            <div className="card h-100">
              <img 
                src={article.urlToImage} 
                className="card-img-top" 
                alt={article.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.description?.slice(0, 100)}...</p>
                <Link to={`/blog/${article.id}`} className="btn btn-primary">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogList;