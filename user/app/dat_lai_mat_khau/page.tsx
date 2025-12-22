import ResetPasswordForm from './ResetPasswordForm';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<p>Loading form...</p>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
