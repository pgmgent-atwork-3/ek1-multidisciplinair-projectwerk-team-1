
export const PrintAdres = (addressText) => {
    const print = () => {
        let printWindow = window.open('', '_blank');
        printWindow.document.write('<p>' + addressText.addressText + '</p>');
        printWindow.print();
    }
    return (
        <button
        onClick={print}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
            Print adres
        </button>
    );
}
