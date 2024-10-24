import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getUserMe, updateUserMe } from '../../redux/user/userSlice';
import { ApplicationLanguage, RegexConstants } from '../../lib/constants';
import { FormInputUpdateUser } from '../../types/ui/form-update-user/form-input-update-user';
import { getSupportedLanguages } from '../../redux/supported-languages/supportedLanguagesSlice';
import InputText from './input-text';
import InputSelect from './input-select';
import { changeNotification } from '../../redux/notification/notificationSlice';
import { NotificationType } from '../../types/ui/snackbar/notification-type';

interface Props {}

export const FormUpdateUser: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();

  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const { supportedLanguages } = useAppSelector(({ supportedLanguages }) => supportedLanguages);

  const { handleSubmit, control, setValue } = useForm<FormInputUpdateUser>({
    mode: 'onSubmit',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      preferredLocalization: '',
    },
  });

  useEffect(() => {
    dispatch(getSupportedLanguages()).then(() => {
      dispatch(getUserMe())
        .unwrap()
        .then((res) => {
          setValue('firstName', res.firstName);
          setValue('lastName', res.lastName);
          setValue('email', res.email);
          setValue('preferredLocalization', res.preferredLocalizationCode);
        }).catch(() => {})
    });
  }, []);

  const onSubmit: SubmitHandler<FormInputUpdateUser> = (data) => {
    setIsLoadingButton(true);
    const body = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      preferredLocalization: data.preferredLocalization,
    };
    dispatch(updateUserMe(body))
      .unwrap()
      .then((res) => {
        localStorage.setItem('bearerToken', res.bearerToken);
        i18n.changeLanguage(data.preferredLocalization);
        localStorage.setItem('selectedLanguage', data.preferredLocalization);
        dispatch(
          changeNotification({
            infoNotification: NotificationType.InfoSuccess,
            text: t('textNotificationUpdateProfile'),
          }),
        );
      })
      .catch(() => {})
      .finally(() => setIsLoadingButton(false));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center">
      <InputText
        control={control}
        name="firstName"
        label={t('inputFirstNameUser')}
        rules={{
          required: t('inputRequiredFields'),
          minLength: {
            value: 2,
            message: t('inputErrorFirstName'),
          },
          maxLength: {
            value: 32,
            message: t('inputErrorFirstName'),
          },
        }}
        style={{ width: '300px' }}
        margin="dense"
      />
      <InputText
        control={control}
        name="lastName"
        label={t('inputLastNameUser')}
        rules={{
          required: t('inputRequiredFields'),
          minLength: {
            value: 2,
            message: t('inputErrorLastName'),
          },
          maxLength: {
            value: 32,
            message: t('inputErrorLastName'),
          },
        }}
        style={{ width: '300px' }}
        margin="dense"
      />
      <InputText
        control={control}
        name="email"
        label={t('inputEmailUser')}
        rules={{
          required: t('inputRequiredFields'),
          pattern: {
            value: RegexConstants.EMAIL,
            message: t('inputErrorEmail'),
          },
        }}
        style={{ width: '300px' }}
        margin="dense"
      />
      <InputSelect
        control={control}
        name="preferredLocalization"
        label={t('inputSupportedLanguages')}
        rules={{ required: t('inputRequiredFields') }}
        items={supportedLanguages.map((lang) => {
          return { key: lang.code, value: lang.value };
        })}
        style={{ width: '300px', marginBottom: '10px', marginTop: '5px' }}
      />

      <div className="text-center">
        <LoadingButton
          loading={isLoadingButton}
          variant="outlined"
          style={{ width: '300px' }}
          type="submit"
          size="large"
        >
          {t('buttonSave')}
        </LoadingButton>
      </div>
    </form>
  );
};
