import { router } from "@inertiajs/react";

export default function Import({ preview }) {
  const [file, setFile] = useState(null);

  const handleDrop = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    // Kirim formData ke backend (Inertia style)
    router.post(route('admin.reklame.import.preview'), formData);
  };

  const handleImport = () => {
    if (!preview?.rows) return;

    router.post(route('admin.reklame.import.confirm'), {
      data: preview.rows,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Import Data Reklame</h1>

      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="border-dashed border-2 p-10 text-center cursor-pointer mb-6">
            <input {...getInputProps()} />
            <p>Drag & drop file Excel di sini, atau klik untuk memilih</p>
          </div>
        )}
      </Dropzone>

      {preview && (
        <div className="mt-6">
          <p>Total Baris: <strong>{preview.total}</strong></p>
          <p>Kategori: <strong>{preview.kategori.join(', ')}</strong></p>

          <div className="overflow-auto max-h-[400px] border rounded mt-4">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {preview.header.map((col) => (
                    <th key={col} className="border p-2">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {preview.rows.slice(0, 10).map((row, idx) => (
                  <tr key={idx}>
                    {preview.header.map((col) => (
                      <td key={col} className="border p-2">{row[col]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={handleImport}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Masukkan ke Database
          </button>
        </div>
      )}
    </div>
  );
}
