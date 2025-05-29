import { useEffect, useState } from 'react';
import { ResponseMyInfoDto } from '../types/auth';
import { useAuth } from '../context/AuthContext';
import { getMyInfo } from '../apis/auth';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto>({} as ResponseMyInfoDto);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        console.log(response);
        setData(response);
      } catch (error) {
        console.error('Failed to get user info:', error);
      }
    };

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login-page');
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      <div className="flex items-center justify-end p-6 border-b border-gray-700">
        <button
          className="flex items-center bg-red-500 hover:opacity-80 px-4 py-2 rounded transition-colors"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>

      <div className="max-w-4xl mx-auto mt-10 p-6">
        <div className="bg-gray-700 rounded-lg">
          <div className="p-8 flex flex-col md:flex-row">
            <div className="mb-4 md:mb-0 md:mr-8 flex flex-col">
              <div className="w-32 h-32 bg-gray-600 rounded-full flex justify-center overflow-hidden">
                {data.data?.avatar ? (
                  <img
                    src={data.data.avatar as string}
                    alt="프로필 사진"
                    className="object-cover"
                  />
                ) : (
                  <span className="text-4xl content-center">없음</span>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">
                {data.data?.name}님 환영합니다
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm">이메일</p>
                  <p className="font-medium">
                    {data.data?.email || '이메일 정보 없음'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
