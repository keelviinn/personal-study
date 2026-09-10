import './App.css';
import { useFetchUser } from './hooks/useFetchUser';

function App() {
  const { user, isLoading: isUserLoading, error: userErrror } = useFetchUser();

  console.log(user, userErrror);

  return (
    <>
      {isUserLoading && <span>User is loading...</span>}
      {!isUserLoading && userErrror && <span>{userErrror.message}</span>}
      {!isUserLoading && !userErrror && user && (
        <>
          <p>Hi {user.name}</p>
        </>
      )}

      {/* <TransactionList /> */}
    </>
  );
}

export default App;
