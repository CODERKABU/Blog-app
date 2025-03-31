import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function BlogDetail() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const post = {
          title: response.data.title,
          description: response.data.body,
          urlToImage: `https://picsum.photos/seed/${response.data.id}/800/400`,
          author: `Author ${response.data.userId}`,
          publishedAt: new Date().toLocaleString()
        };
        setArticle(post);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center m-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">Article not found</div>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container mt-4" data-bs-theme="dark" >
      <Link to="/" className="btn btn-outline-primary mb-4">← Back to Articles</Link>
      <div className="card">
        <img 
          src={article.urlToImage} 
          className="card-img-top" 
          alt={article.title}
          style={{ height: '400px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h1 className="card-title mb-4">{article.title}</h1>
          <p className="card-text" style={{ whiteSpace: 'pre-line' }}>{article.description}</p>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;