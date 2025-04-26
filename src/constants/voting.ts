import { DurationInput } from 'effect/Duration';

export const PROJECT_VOTE_LIMIT = 3;

export const VOTE_VERIFICATION_CODE_LENGTH = 6;
export const VOTE_VERIFICATION_CODE_EXPIRATION_DURATION: DurationInput = '30 minutes';
export const VOTE_VERIFICATION_EMAIL_COOLDOWN_DURATION: DurationInput = '1 minute';
