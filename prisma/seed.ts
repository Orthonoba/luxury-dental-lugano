import { PrismaClient, StepStatus } from '../src/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding portal data…')

  // ── Demo patient user ──────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash('Demo1234!', 12)

  const patientUser = await prisma.user.upsert({
    where: { email: 'demo.paziente@luxurydental.ch' },
    update: {},
    create: {
      email: 'demo.paziente@luxurydental.ch',
      passwordHash,
      role: 'PATIENT',
      emailVerified: true,
      patient: {
        create: {
          firstName: 'Marco',
          lastName: 'Rossi',
          phone: '+41 91 234 5678',
          dateOfBirth: new Date('1985-03-15'),
          preferredLocale: 'it',
          notes: 'Paziente demo — dati di test',
        },
      },
    },
    include: { patient: true },
  })

  const patient = patientUser.patient!
  console.log(`✅ Demo patient: ${patientUser.email} (password: Demo1234!)`)

  // ── Demo admin/doctor user ─────────────────────────────────────────────────
  const adminHash = await bcrypt.hash('Admin9999!', 12)

  await prisma.user.upsert({
    where: { email: 'staff@luxurydental.ch' },
    update: {},
    create: {
      email: 'staff@luxurydental.ch',
      passwordHash: adminHash,
      role: 'ADMIN',
      emailVerified: true,
    },
  })
  console.log('✅ Staff user: staff@luxurydental.ch (password: Admin9999!)')

  // ── Treatment with steps ───────────────────────────────────────────────────
  const treatment = await prisma.treatment.upsert({
    where: { id: 'seed-treatment-1' },
    update: {},
    create: {
      id: 'seed-treatment-1',
      patientId: patient.id,
      title: 'Digital Smile Design + Faccette in Porcellana',
      type: 'AESTHETICS',
      description:
        'Trasformazione completa del sorriso con 8 faccette in porcellana e-max su arcata superiore, preceduta da pianificazione digitale DSD.',
      status: 'IN_PROGRESS',
      startDate: new Date('2026-02-01'),
      estimatedEnd: new Date('2026-08-30'),
      doctorName: 'Dr. Andrea Calandrino',
      progress: 45,
      totalCost: 9800.0,
      currency: 'CHF',
    },
  })

  // Steps for the treatment
  const steps: Array<{
    id: string; title: string; status: StepStatus; order: number;
    completedAt?: Date; scheduledAt?: Date
  }> = [
    { id: 'step-1', title: 'Consulenza e Digital Smile Design', status: StepStatus.COMPLETED, order: 1, completedAt: new Date('2026-02-05'), scheduledAt: new Date('2026-02-05') },
    { id: 'step-2', title: 'Esame radiologico 3D e fotografie cliniche', status: StepStatus.COMPLETED, order: 2, completedAt: new Date('2026-02-12'), scheduledAt: new Date('2026-02-12') },
    { id: 'step-3', title: 'Approvazione piano digitale e mock-up provvisorio', status: StepStatus.COMPLETED, order: 3, completedAt: new Date('2026-03-01'), scheduledAt: new Date('2026-03-01') },
    { id: 'step-4', title: 'Preparazione dei denti (minimi spessori)', status: StepStatus.IN_PROGRESS, order: 4, scheduledAt: new Date('2026-06-20') },
    { id: 'step-5', title: 'Impronta digitale e invio al laboratorio', status: StepStatus.PENDING, order: 5, scheduledAt: new Date('2026-06-20') },
    { id: 'step-6', title: 'Prova faccette provvisorie', status: StepStatus.PENDING, order: 6, scheduledAt: new Date('2026-07-10') },
    { id: 'step-7', title: 'Cementazione definitiva faccette e-max', status: StepStatus.PENDING, order: 7, scheduledAt: new Date('2026-08-05') },
    { id: 'step-8', title: 'Controllo e lucidatura finale', status: StepStatus.PENDING, order: 8, scheduledAt: new Date('2026-08-20') },
  ]

  for (const step of steps) {
    await prisma.treatmentStep.upsert({
      where: { id: step.id },
      update: {},
      create: { ...step, treatmentId: treatment.id, description: null },
    })
  }
  console.log(`✅ Treatment seeded with ${steps.length} steps`)

  // ── Appointments ───────────────────────────────────────────────────────────
  await prisma.patientAppointment.upsert({
    where: { id: 'seed-appt-1' },
    update: {},
    create: {
      id: 'seed-appt-1',
      patientId: patient.id,
      title: 'Preparazione faccette — 2ª sessione',
      type: 'dental',
      status: 'CONFIRMED',
      doctorName: 'Dr. Andrea Calandrino',
      scheduledAt: new Date('2026-06-20T10:00:00'),
      duration: 90,
      notes: 'Portare occhiali da sole per la luce. Venire a stomaco leggero.',
    },
  })

  await prisma.patientAppointment.upsert({
    where: { id: 'seed-appt-2' },
    update: {},
    create: {
      id: 'seed-appt-2',
      patientId: patient.id,
      title: 'Controllo allineamento post-preparazione',
      type: 'dental',
      status: 'SCHEDULED',
      doctorName: 'Dr. Andrea Calandrino',
      scheduledAt: new Date('2026-07-10T11:30:00'),
      duration: 45,
    },
  })

  await prisma.patientAppointment.upsert({
    where: { id: 'seed-appt-3' },
    update: {},
    create: {
      id: 'seed-appt-3',
      patientId: patient.id,
      title: 'Consulenza Digital Smile Design',
      type: 'dental',
      status: 'COMPLETED',
      doctorName: 'Dr. Andrea Calandrino',
      scheduledAt: new Date('2026-02-05T09:00:00'),
      duration: 60,
    },
  })
  console.log('✅ 3 appointments seeded')

  // ── Documents ──────────────────────────────────────────────────────────────
  await prisma.document.upsert({
    where: { id: 'seed-doc-1' },
    update: {},
    create: {
      id: 'seed-doc-1',
      patientId: patient.id,
      type: 'BUDGET',
      name: 'Preventivo DSD + Faccette e-max — Febbraio 2026.pdf',
      description: 'Preventivo dettagliato per trattamento completo',
      filePath: 'demo/preventivo-dsd-faccette-2026.pdf',
      fileSize: 245760,
      mimeType: 'application/pdf',
      uploadedBy: 'staff@luxurydental.ch',
    },
  })

  await prisma.document.upsert({
    where: { id: 'seed-doc-2' },
    update: {},
    create: {
      id: 'seed-doc-2',
      patientId: patient.id,
      type: 'REPORT',
      name: 'Relazione clinica iniziale — 12 Feb 2026.pdf',
      description: 'Documentazione fotografica e relazione esame iniziale',
      filePath: 'demo/relazione-clinica-iniziale.pdf',
      fileSize: 1843200,
      mimeType: 'application/pdf',
      uploadedBy: 'staff@luxurydental.ch',
    },
  })

  await prisma.document.upsert({
    where: { id: 'seed-doc-3' },
    update: {},
    create: {
      id: 'seed-doc-3',
      patientId: patient.id,
      type: 'XRAY',
      name: 'Ortopantomografia — Febbraio 2026.jpg',
      description: 'Rx panoramica pre-trattamento',
      filePath: 'demo/ortopantomografia-feb-2026.jpg',
      fileSize: 3145728,
      mimeType: 'image/jpeg',
      uploadedBy: 'staff@luxurydental.ch',
    },
  })
  console.log('✅ 3 documents seeded (paths are demo — no real files needed)')

  // ── Payments ───────────────────────────────────────────────────────────────
  await prisma.payment.upsert({
    where: { id: 'seed-pay-1' },
    update: {},
    create: {
      id: 'seed-pay-1',
      patientId: patient.id,
      treatmentId: treatment.id,
      amount: 2000.0,
      currency: 'CHF',
      status: 'PAID',
      method: 'card',
      description: 'Acconto 20% — Avvio trattamento DSD',
      paidAt: new Date('2026-02-05'),
    },
  })

  await prisma.payment.upsert({
    where: { id: 'seed-pay-2' },
    update: {},
    create: {
      id: 'seed-pay-2',
      patientId: patient.id,
      treatmentId: treatment.id,
      amount: 3000.0,
      currency: 'CHF',
      status: 'PAID',
      method: 'bank_transfer',
      description: 'Saldo 30% — Approvazione design digitale',
      paidAt: new Date('2026-03-01'),
    },
  })

  await prisma.payment.upsert({
    where: { id: 'seed-pay-3' },
    update: {},
    create: {
      id: 'seed-pay-3',
      patientId: patient.id,
      treatmentId: treatment.id,
      amount: 4800.0,
      currency: 'CHF',
      status: 'PENDING',
      method: null,
      description: 'Saldo finale 50% — Da pagare alla cementazione definitiva',
    },
  })
  console.log('✅ 3 payments seeded (CHF 5000 paid, CHF 4800 pending)')

  console.log('\n🎉 Seed completato!')
  console.log('─────────────────────────────────────')
  console.log('Patient login:  demo.paziente@luxurydental.ch')
  console.log('Password:       Demo1234!')
  console.log('─────────────────────────────────────')
  console.log('Staff login:    staff@luxurydental.ch')
  console.log('Password:       Admin9999!')
  console.log('─────────────────────────────────────')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
