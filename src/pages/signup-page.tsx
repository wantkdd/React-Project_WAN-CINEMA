import { z } from 'zod';
import {
  SubmitHandler,
  useForm,
  UseFormRegister,
  FieldErrors,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postSignup } from '../apis/auth';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { signupSchema } from '../utils/validate';

type FormFields = z.infer<typeof signupSchema>;

type StepProps = {
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
  watchedValues: FormFields;
};

type EmailStepProps = StepProps & {
  nextStep: () => void;
};

type PasswordStepProps = StepProps & {
  showPassword: boolean;
  showPasswordCheck: boolean;
  togglePassword: () => void;
  togglePasswordCheck: () => void;
  nextStep: () => void;
  prevStep: () => void;
};

type NameStepProps = StepProps & {
  isSubmitting: boolean;
  prevStep: () => void;
  onSubmit: () => void;
};

const ErrorMessage = ({ message }: { message: string | undefined }) => (
  <div className="text-red-500 text-sm">{message}</div>
);

const EmailStep = ({
  register,
  errors,
  watchedValues,
  nextStep,
}: EmailStepProps) => (
  <>
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
      {errors?.email && <ErrorMessage message={errors.email.message} />}
    </div>
    <button
      disabled={!watchedValues.email || !!errors.email}
      type="button"
      className="w-full bg-green-500 hover:bg-green-600 mt-10 text-white py-3 rounded-md text-lg font-medium transition-colors cursor-pointer disabled:bg-gray-300"
      onClick={nextStep}
    >
      다음
    </button>
  </>
);

const PasswordStep = ({
  register,
  errors,
  watchedValues,
  showPassword,
  showPasswordCheck,
  togglePassword,
  togglePasswordCheck,
  nextStep,
  prevStep,
}: PasswordStepProps) => (
  <>
    <div className="mb-4">
      <p className="text-white mb-2">이메일: {watchedValues.email}</p>
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
      {errors?.password && <ErrorMessage message={errors.password.message} />}
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
        <ErrorMessage message={errors.passwordCheck.message} />
      )}
    </div>

    <div className="flex gap-2">
      <button
        type="button"
        className="w-1/2 bg-gray-500 hover:bg-gray-600 mt-10 text-white py-3 rounded-md text-lg font-medium transition-colors cursor-pointer"
        onClick={prevStep}
      >
        이전
      </button>
      <button
        disabled={
          !watchedValues.password ||
          !watchedValues.passwordCheck ||
          !!errors.password ||
          !!errors.passwordCheck
        }
        type="button"
        className="w-1/2 bg-green-500 hover:bg-green-600 mt-10 text-white py-3 rounded-md text-lg font-medium transition-colors cursor-pointer disabled:bg-gray-300"
        onClick={nextStep}
      >
        다음
      </button>
    </div>
  </>
);

const NameStep = ({
  register,
  errors,
  watchedValues,
  isSubmitting,
  prevStep,
  onSubmit,
}: NameStepProps) => (
  <>
    <div className="mb-4">
      <p className="text-white mb-2">이메일: {watchedValues.email}</p>
      <p className="text-white mb-2">비밀번호: {watchedValues.password}</p>
    </div>
    <div className="mb-4">
      <input
        {...register('name')}
        type="text"
        id="name"
        className={`placeholder-white border text-white border-[#ccc] w-full p-[10px] focus:border-[#807bff] rounded-sm 
        ${errors?.name ? 'border-red-400 ' : ' border-gray-300'}`}
        placeholder="이름"
      />
      {errors?.name && <ErrorMessage message={errors.name.message} />}
    </div>

    <div className="flex gap-2">
      <button
        type="button"
        className="w-1/2 bg-gray-500 hover:bg-gray-600 mt-10 text-white py-3 rounded-md text-lg font-medium transition-colors cursor-pointer"
        onClick={prevStep}
      >
        이전
      </button>
      <button
        disabled={!watchedValues.name || !!errors.name || isSubmitting}
        type="button"
        className="w-1/2 bg-green-500 hover:bg-green-600 mt-10 text-white py-3 rounded-md text-lg font-medium transition-colors cursor-pointer disabled:bg-gray-300"
        onClick={onSubmit}
      >
        회원가입
      </button>
    </div>
  </>
);

const SignupPage = () => {
  const [step, setStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const togglePasswordCheck = () => setShowPasswordCheck((prev) => !prev);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    trigger,
  } = useForm<FormFields>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
    },
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  });

  const watchedValues = watch();

  const stepValidationFields = {
    1: ['email'] as const,
    2: ['password', 'passwordCheck'] as const,
    3: ['name'] as const,
  };

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

  const nextStep = async () => {
    const fieldsToValidate =
      stepValidationFields[step as keyof typeof stepValidationFields]; //step에 해당하는 validation field를 유니온타입으로 가져옴
    const isStepValid = await trigger(fieldsToValidate); //trigger를 통해 validation을 수행하고, 유효성 검사 결과를 isStepValid에 저장

    if (isStepValid) {
      setStep((prev) => prev + 1);
    }
  };
  const prevStep = () => {
    setStep((prev) => (prev - 1 < 1 ? 1 : prev - 1));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800">
      <div className="p-6 rounded w-96">
        <form>
          {step === 1 && (
            <EmailStep
              register={register}
              errors={errors}
              watchedValues={watchedValues}
              nextStep={nextStep}
            />
          )}
          {step === 2 && (
            <PasswordStep
              register={register}
              errors={errors}
              watchedValues={watchedValues}
              showPassword={showPassword}
              showPasswordCheck={showPasswordCheck}
              togglePassword={togglePassword}
              togglePasswordCheck={togglePasswordCheck}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 3 && (
            <NameStep
              register={register}
              errors={errors}
              watchedValues={watchedValues}
              isSubmitting={isSubmitting}
              prevStep={prevStep}
              onSubmit={handleSubmit(onSubmit)}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
