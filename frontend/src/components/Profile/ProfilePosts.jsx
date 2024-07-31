import { PostGrid } from "./Profile.styles";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ProfilePosts = () => {
  // 获取用户id
  const { id } = useParams();
  // 获取所有的post数据
  const postData = useSelector((state) => state.post.postData);
  // 过滤出与id相同的用户
  let filteredPosts = postData.filter((post) => {
    return post.userID === id;
  });
  // 如果有帖子，则遍历filteredPosts并显示帖子
  // 如果没有帖子，则显示“没有帖子”
  return (
    <PostGrid>
      {filteredPosts.length ? (
        filteredPosts.map((post) => {
          // 用map遍历时建议每个元素都有一个key
          //如果有重复的元素，光用index可能检测不到变化，所以加上post.userID能让key更唯一
          return (
            <Link key={post.postID} to={`/profile/${id}`}>
              <div>
                <div className="overlay"></div>
                <img
                  src={`http://localhost:8000/api/posts/image/${post._id}`}
                  alt="post"
                />
              </div>
            </Link>
          );
        })
      ) : (
        <h2 className="empty-post-section">No Posts Yet!</h2>
      )}
    </PostGrid>
  );
};

export default ProfilePosts;
