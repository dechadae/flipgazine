// Canonical implementation lives with the private Supabase answer service.
// This compatibility export keeps the Phase C/D harness path stable while
// ensuring public prepare, admin audit and parity all execute one router.
export * from '../supabase/functions/answers-service/router-v124.mjs';
