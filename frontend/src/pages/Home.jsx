export default function Home() {
  return (
    <main className="flex-1 p-6 bg-gray-100">
      <section id="overview" className="mb-8">
        <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4">
          Overview
        </h2>
        <p>
          Welcome to the Smart Class Dashboard. Here you can manage all your
          classes and students.
        </p>
      </section>
      <section id="classes" className="mb-8">
        <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4">
          Classes
        </h2>
        <p>Manage your classes here.</p>
      </section>
      <section id="students" className="mb-8">
        <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4">
          Students
        </h2>
        <p>View and manage student information.</p>
      </section>
      <section id="settings">
        <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4">
          Settings
        </h2>
        <p>Adjust your preferences and settings here.</p>
      </section>
    </main>
  );
}
