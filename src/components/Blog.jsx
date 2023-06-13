const Blog = ({ title, blog, email }) => {
  return (
    <div className="blogContainer">
      <div className="blog-header">
        <div className="blog-title">{title}</div>
        <div className="btn-container">
          <button className="edit">edit</button>
          <button className="delete">delete</button>
        </div>
      </div>
      <div className="blog-body">{blog}</div>
      <div className="blog-footer">{email}</div>
    </div>
  );
};

export default Blog;
