import styles from "./UserCard.module.sass";

interface IUserCardProps {
  userItem: any;
}

export const UserCard: React.FC<IUserCardProps> = ({ userItem }) => {
  return (
    <div className={styles.user_container}>
      <div className={styles.user_avatar}>
        <img src={userItem.photo} alt="" />
      </div>
      <div className={styles.user_info}>
        <div className={styles.user_name}>{userItem.name}</div>
        <div className={styles.user_university}>{userItem.university}</div>
      </div>
    </div>
  );
};
