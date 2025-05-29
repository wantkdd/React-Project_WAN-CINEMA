import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSignup } from '../apis/auth';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const schema = z
  .object({
    email: z.string().email({ message: '올바른 이메일 형식이 아닙니다.' }),
    password: z
      .string()
      .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
      .max(20, { message: '비밀번호는 20자 이하여야 합니다.' }),
    passwordCheck: z
      .string()
      .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
      .max(20, {
        message: '비밀번호는 20자 이하여야 합니다.',
      }),

    name: z.string().min(1, { message: '이름을 입력해주세요.' }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordCheck'],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const togglePasswordCheck = () => setShowPasswordCheck((prev) => !prev);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
    },
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { ...rest } = data;
    try {
      const response = await postSignup(rest);
      if (response) {
        navigate('/login-page');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
      <form className="p-6 rounded w-96">
        <div className="mb-4">
          <input
            {...register('email')}
            type="email"
            name="email"
            className={`placeholder-white border text-white border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm 
        ${errors?.email ? 'border-red-400 ' : ' border-gray-300'}`}
            placeholder={'이메일'}
            autoComplete="current-email"
          />

          {errors?.email && (
            <div className="text-red-500 text-sm">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-4 relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            id="password"
            className={`placeholder-white border text-white border-[#ccc] w-full p-[10px] pr-10 focus:border-[#807bff] rounded-sm 
      ${errors?.password ? 'border-red-400 ' : ' border-gray-300'}`}
            placeholder="비밀번호"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute right-3 top-3 text-white"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
          {errors?.password && (
            <div className="text-red-500 text-sm">
              {errors.password.message}
            </div>
          )}
        </div>

        <div className="mb-4 relative">
          <input
            {...register('passwordCheck')}
            type={showPasswordCheck ? 'text' : 'password'}
            id="passwordCheck"
            className={`placeholder-white border text-white border-[#ccc] w-full p-[10px] pr-10 focus:border-[#807bff] rounded-sm 
      ${errors?.passwordCheck ? 'border-red-400 ' : ' border-gray-300'}`}
            placeholder="비밀번호 확인"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={togglePasswordCheck}
            className="absolute right-3 top-3 text-white"
          >
            {showPasswordCheck ? <FiEyeOff /> : <FiEye />}
          </button>
          {errors?.passwordCheck && (
            <div className="text-red-500 text-sm">
              {errors.passwordCheck.message}
            </div>
          )}
        </div>

        <div className="mb-4">
          <input
            {...register('name')}
            type="name"
            id="name"
            className={`placeholder-white border text-white border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm 
        ${errors?.password ? 'border-red-400 ' : ' border-gray-300'}`}
            placeholder="이름"
            autoComplete="current-password"
          />
          {errors?.name && (
            <div className="text-red-500 text-sm">{errors.name.message}</div>
          )}
        </div>

        <button
          disabled={!isValid || isSubmitting}
          type="button"
          className="w-full bg-green-500 hover:bg-green-600 mt-10 text-white py-3 rounded-md text-lg font-medium transition-colors cursor-pointer disabled:bg-gray-300"
          onClick={handleSubmit(onSubmit)}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
