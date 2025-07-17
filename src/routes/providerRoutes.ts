import express from 'express';
import upload from '../middlewares/upload';
import { validateRequest } from '../middlewares/validateRequest';

import {
  registerProviderLab,
  registerProviderDoctor,
  registerProviderNurse,
  registerProviderPhysiotherapist,
  loginProvider,
  getAllProviders,
  getProviderById,
  updateProvider,
  deleteProvider,
} from '../controllers/providerAuthController';
import {
  doctorRegistrationSchema,
  nurseRegistrationSchema,
  labRegistrationSchema,
  physiotherapistRegistrationSchema,
} from '../validations/providerValidations';

const router = express.Router();

// 🩺 Registration routes (with Zod validation & image upload)
router.post(
  '/auth/register/doctor',
  upload.single('profileImage'),
  validateRequest(doctorRegistrationSchema),
  registerProviderDoctor
);

router.post(
  '/auth/register/nurse',
  upload.single('profileImage'),
  validateRequest(nurseRegistrationSchema),
  registerProviderNurse
);

router.post(
  '/auth/register/lab',
  upload.single('profileImage'),
  validateRequest(labRegistrationSchema),
  registerProviderLab
);

router.post(
  '/auth/register/physiotherapist',
  upload.single('profileImage'),
  validateRequest(physiotherapistRegistrationSchema),
  registerProviderPhysiotherapist
);

// 🔑 Login route
router.post('/auth/login', loginProvider);

// 📋 Management routes
router.get('/', getAllProviders);
router.get('/:id', getProviderById);
router.put('/:id', upload.single('profileImage'), updateProvider);
router.delete('/:id', deleteProvider);

export default router;
