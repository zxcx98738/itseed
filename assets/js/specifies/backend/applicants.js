$(function() {
    $('#applicantsTable').DataTable({
        "lengthMenu": [ [ 10, 25, 50, 100, -1 ], [10, 25, 50, 100, "所有"] ],
        "language": {
            "url": "/js/specifies/backend/plugins/Chinese-traditional.json"
        }
    });
});