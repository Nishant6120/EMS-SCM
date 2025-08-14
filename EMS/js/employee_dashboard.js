(function($) {
    "use strict";

    // --- MOCK DATA ---
    const mockData = {
        organizations: [
            { _id: 'ORG001', name: 'Legrand', isActive: true },
            { _id: 'ORG002', name: 'Accutech', isActive: true },
            { _id: 'ORG003', name: 'Global Corp', isActive: false }
        ],
        processes: [
            { _id: 'PROC001', name: 'Legrand_CRM', organizationId: 'ORG001', isActive: true },
            { _id: 'PROC002', name: 'Numeric_AMC', organizationId: 'ORG002', isActive: true },
            { _id: 'PROC003', name: 'Numeric_Product', organizationId: 'ORG002', isActive: false }
        ],
        campaigns: [
            { _id: 'CAMP001', name: 'Bulk order', organizationId: 'ORG001', processId: 'PROC001', isActive: true },
            { _id: 'CAMP002', name: 'Home Automation', organizationId: 'ORG001', processId: 'PROC001', isActive: true },
            { _id: 'CAMP003', name: 'Legrand_eShop', organizationId: 'ORG002', processId: 'PROC002', isActive: false }
        ],
        tasks: [
            { id: 'TID001', taskDate: '2025-08-14', organization: 'ORG001', process: 'PROC001', assignedToEmployee: 'emp_001', status: 'Pending', generalComment: 'Initial task for Q3 sales.', isActive: true, leads: { dateFrom: '2025-08-01', dateTo: '2025-08-05', month: 'Aug', year: '2025', region: 'North', campaign: 'CAMP001', quantity: 100, convertToProspects: 10, comment: 'Initial lead engagement', assignments: ['date-2025-08-01-2025-08-05', 'month-Aug-2025', 'region-North', 'campaign-CAMP001'] }, prospects: null, activeLeadsToProspects: 5, activeConvertToWon: 0, activeSales: 0 },
            { id: 'TID002', taskDate: '2025-08-14', organization: 'ORG002', process: 'PROC002', assignedToEmployee: 'emp_001', status: 'Under Process', generalComment: 'Follow up on product inquiries.', isActive: true, leads: null, prospects: { dateFrom: '2025-08-06', dateTo: '2025-08-10', month: 'Aug', year: '2025', region: 'East', campaign: 'CAMP003', quantity: 10, convertToWon: 2, employeeSaleTarget: 250000, comment: 'Client signed up.', assignments: ['date-2025-08-06-2025-08-10', 'month-Aug-2025', 'region-East', 'campaign-CAMP003'] }, activeLeadsToProspects: 0, activeConvertToWon: 1, activeSales: 125000 },
            { id: 'TID003', taskDate: '2025-08-13', organization: 'ORG001', process: 'PROC001', assignedToEmployee: 'emp_001', status: 'Completed', generalComment: 'CRM system update analysis.', isActive: false, leads: { dateFrom: '2025-08-10', dateTo: '2025-08-13', month: 'Aug', year: '2025', region: 'South', campaign: 'CAMP002', quantity: 50, convertToProspects: 5, comment: 'Reviewed current CRM usage.', assignments: ['date-2025-08-10-2025-08-13', 'month-Aug-2025', 'region-South', 'campaign-CAMP002'] }, prospects: null, activeLeadsToProspects: 5, activeConvertToWon: 0, activeSales: 0 },
            { id: 'TID004', taskDate: '2025-08-14', organization: 'ORG001', process: 'PROC001', assignedToEmployee: 'emp_002', status: 'On Hold', generalComment: 'Launch new product line campaign.', isActive: true, leads: null, prospects: { dateFrom: '2025-08-01', dateTo: '2025-08-07', month: 'Aug', year: '2025', region: 'West', campaign: 'CAMP003', quantity: 15, convertToWon: 3, employeeSaleTarget: 300000, comment: 'Awaiting final creative assets.', assignments: ['date-2025-08-01-2025-08-07', 'month-Aug-2025', 'region-West', 'campaign-CAMP003'] }, activeLeadsToProspects: 0, activeConvertToWon: 1, activeSales: 100000 },
        ],
        hourlyUpdates: [
            { date: '2025-08-14', timeSlot: '09:30AM-10:30AM', employeeId: 'emp_001', processId: 'PROC001', calls: 5, prospects: 2, wonCases: 1, sales: 50000 },
            { date: '2025-08-14', timeSlot: '10:30AM-11:30AM', employeeId: 'emp_001', processId: 'PROC001', calls: 10, prospects: 3, wonCases: 0, sales: 0 },
            { date: '2025-08-13', timeSlot: '11:30AM-12:30PM', employeeId: 'emp_001', processId: 'PROC001', calls: 8, prospects: 1, wonCases: 0, sales: 0 }
        ],
        allocatedTasks: [
            { id: 'ATID001', assignedTo: 'emp_001', assignedDate: '2025-08-12', dueDate: '2025-08-15', taskCompletedDate: null, task: 'Prepare weekly sales report.', remark: 'Started working on it.', status: 'Under Process' },
            { id: 'ATID002', assignedTo: 'emp_001', assignedDate: '2025-08-11', dueDate: '2025-08-13', taskCompletedDate: '2025-08-13', task: 'Follow up with client X.', remark: 'Client signed up.', status: 'Completed' },
            { id: 'ATID003', assignedTo: 'emp_001', assignedDate: '2025-08-10', dueDate: '2025-08-16', taskCompletedDate: null, task: 'Review Q2 performance.', remark: 'Pending data validation.', status: 'Pending' }
        ],
        employees: [
            { id: 'emp_001', name: 'Kirti Agrawal', designation: 'Manager', department: 'Sales', organizations: ['ORG001', 'ORG002'], processes: ['PROC001', 'PROC002'], isActive: true },
            { id: 'emp_002', name: 'Harpreet Kaur', designation: 'Analyst', department: 'Marketing', organizations: ['ORG002'], processes: ['PROC002'], isActive: true },
            { id: 'emp_003', name: 'Chandani', designation: 'Developer', department: 'IT', organizations: ['ORG001'], processes: ['PROC001'], isActive: false },
            { id: 'emp_004', name: 'Raj Patel', designation: 'Sales Rep', department: 'Sales', organizations: ['ORG002'], processes: ['PROC003'], isActive: true }
        ]
    };

    // --- GLOBALS AND CACHED ELEMENTS ---
    let allTasks = [];
    const loggedInEmployeeId = 'emp_001';
    const employeeData = mockData.employees.find(e => e.id === loggedInEmployeeId);
    const elements = {
        mainNavbar: $('#main-admin-navbar'),
        welcomeMessage: $('#welcomeMessage'),
        logoutBtn: $('#logoutBtn'),
        contentSections: $('.content-section'),
        
        // Daily Work Plan
        dailyWorkPlanContent: $('#dailyWorkPlanContent'),
        noTasksAssigned: $('#noTasksAssigned'),
        
        // My Task
        allocatedTaskFromDate: $('#allocatedTaskFromDate'),
        allocatedTaskToDate: $('#allocatedTaskToDate'),
        allocatedTaskStatusFilter: $('#allocatedTaskStatusFilter'),
        applyTaskFilterBtn: $('#applyTaskFilterBtn'),
        clearTaskFilterBtn: $('#clearTaskFilterBtn'),
        allocatedTasksTableBody: $('#allocatedTasksTableBody'),
        editAllocatedTaskModal: $('#editAllocatedTaskModal'),
        updateAllocatedTaskForm: $('#updateAllocatedTaskForm'),
        modalTaskId: $('#modalTaskId'),
        modalTaskDescription: $('#modalTaskDescription'),
        modalTaskCompletedDate: $('#modalTaskCompletedDate'),
        modalEmpRemark: $('#modalEmpRemark'),
        modalStatus: $('#modalStatus'),

        // Performance
        performanceDateFrom: $('#performanceDateFrom'),
        performanceDateTo: $('#performanceDateTo'),
        performanceFilterOrganization: $('#performanceFilterOrganization'),
        performanceFilterProcess: $('#performanceFilterProcess'),
        applyPerformanceFilterBtn: $('#applyPerformanceFilterBtn'),
        clearPerformanceFilterBtn: $('#clearPerformanceFilterBtn'),
        leadsTarget: $('#leadsTarget'),
        leadsAchieved: $('#leadsAchieved'),
        leadsScore: $('#leadsScore'),
        prospectsTarget: $('#prospectsTarget'),
        prospectsAchieved: $('#prospectsAchieved'),
        prospectsScore: $('#prospectsScore'),
        salesTarget: $('#salesTarget'),
        salesAchieved: $('#salesAchieved'),
        salesScore: $('#salesScore'),
        overallScore: $('#overallScore'),
    };

    // --- UTILITY FUNCTIONS ---
    function checkAuth() { return true; }
    
    function parseDate(dateStr) {
        if (!dateStr) return null;
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            return new Date(parts[2], parts[1] - 1, parts[0]);
        }
        return null;
    }

    function formatDateToISO(dateStr) {
        if (!dateStr) return null;
        const parts = dateStr.split('/');
        if (parts.length === 3) {
            return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
        }
        return null;
    }

    function formatDateForDisplay(dateStr) {
        if (!dateStr) return '--';
        return new Date(dateStr).toLocaleDateString('en-GB');
    }

    function getStatusBadge(status) {
        let badgeClass = 'bg-secondary';
        switch (status) {
            case 'Pending': badgeClass = 'bg-warning text-dark'; break;
            case 'Under Process': badgeClass = 'bg-info text-dark'; break;
            case 'Completed': badgeClass = 'bg-success'; break;
            case 'On hold': badgeClass = 'bg-danger'; break;
            case 'Overdue': badgeClass = 'bg-danger'; break;
        }
        return `<span class="badge ${badgeClass}">${status}</span>`;
    }
    
    // Function to format numbers as Indian Rupees with commas, without decimals
    function formatIndianRupees(value) {
        if (value === null || value === undefined || isNaN(value)) {
            return '0';
        }
        const amount = Math.round(value);
        return amount.toLocaleString('en-IN');
    }

    function populateDropdown(dropdown, dataArray, valueKey, textKey, defaultOptionText = 'Select', hasAllOption = false) {
        if (!dropdown.length) {
            console.warn("Dropdown element not found:", dropdown.selector);
            return;
        }
        const currentVal = dropdown.val();
        dropdown.empty();
        dropdown.append(new Option(hasAllOption ? defaultOptionText.replace('Select', 'All') : defaultOptionText, ''));
        dataArray.forEach(item => dropdown.append(new Option(item[textKey], item[valueKey])));
        dropdown.val(currentVal).trigger('change.select2');
    }

    function initializeUIComponents() {
        $('.select2-enabled').select2({ placeholder: "Select", allowClear: true, width: '100%' });
        $('.select2-enabled-filter').select2({ placeholder: "All", allowClear: true, width: '100%' });
        $(".datepicker, .datepicker-filter").datepicker({ dateFormat: 'dd/mm/yy' });
    }

    // --- DATA HANDLING AND RENDERING ---
    function loadData() {
        const { tasks, organizations, processes, campaigns } = mockData;
        const orgMap = new Map(organizations.map(o => [o._id, o.name]));
        const processMap = new Map(processes.map(p => [p._id, p.name]));
        const campaignMap = new Map(campaigns.map(c => [c._id, c.name]));

        const employeeTasks = tasks.filter(task => task.assignedToEmployee === loggedInEmployeeId);
        allTasks = employeeTasks.map(task => ({
            ...task,
            organizationName: orgMap.get(task.organization) || '--',
            processName: processMap.get(task.process) || '--',
            leads: task.leads ? { ...task.leads, campaignName: campaignMap.get(task.leads.campaign) || '--' } : null,
            prospects: task.prospects ? { ...task.prospects, campaignName: campaignMap.get(task.prospects.campaign) || '--' } : null,
        }));
    }

    function renderDailyWorkPlan() {
        const today = new Date().toISOString().split('T')[0];
        elements.dailyWorkPlanContent.empty();

        const todayTasks = allTasks.filter(t => t.taskDate === today && t.isActive);

        if (todayTasks.length === 0) {
            elements.dailyWorkPlanContent.append(`
                <div class="alert alert-info" role="alert">
                    No daily work plan has been assigned to you for today.
                </div>
            `);
            return;
        }
        
        const orgProcessGroups = todayTasks.reduce((acc, task) => {
            const key = `${task.organization}-${task.process}`;
            if (!acc[key]) {
                acc[key] = {
                    organizationName: task.organizationName,
                    processName: task.processName,
                    organizationId: task.organization,
                    processId: task.process,
                    tasks: []
                };
            }
            acc[key].tasks.push(task);
            return acc;
        }, {});

        for (const key in orgProcessGroups) {
            const group = orgProcessGroups[key];
            const tasksHtml = group.tasks.map(task => `
                <div class="row">
                    <div class="col-lg-6">
                        <div class="card mb-3 task-card">
                            <div class="card-header bg-primary text-white">Lead to Prospect</div>
                            <div class="card-body">
                                <div class="mb-2"><strong>Date:</strong> ${task.leads?.dateFrom ? `${formatDateForDisplay(task.leads.dateFrom)} - ${formatDateForDisplay(task.leads.dateTo)}` : '--'}</div>
                                <div class="mb-2"><strong>Month-Year:</strong> ${task.leads?.month && task.leads?.year ? `${task.leads.month}-${task.leads.year}` : '--'}</div>
                                <div class="mb-2"><strong>Region:</strong> ${task.leads?.region || '--'}</div>
                                <div class="mb-2"><strong>Campaign:</strong> ${task.leads?.campaignName || '--'}</div>
                                <div class="mb-2"><strong># Lead:</strong> ${task.leads?.quantity || 0}</div>
                                <div class="mb-2"><strong>Target - Conv to Prospects:</strong> ${task.leads?.convertToProspects || 0}</div>
                                <div class="mb-2"><strong>Comment:</strong> ${task.leads?.comment || '--'}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="card mb-3 task-card">
                            <div class="card-header bg-success text-white">Prospect to Won</div>
                            <div class="card-body">
                                <div class="mb-2"><strong>Date:</strong> ${task.prospects?.dateFrom ? `${formatDateForDisplay(task.prospects.dateFrom)} - ${formatDateForDisplay(task.prospects.dateTo)}` : '--'}</div>
                                <div class="mb-2"><strong>Month-Year:</strong> ${task.prospects?.month && task.prospects?.year ? `${task.prospects.month}-${task.prospects.year}` : '--'}</div>
                                <div class="mb-2"><strong>Region:</strong> ${task.prospects?.region || '--'}</div>
                                <div class="mb-2"><strong>Campaign:</strong> ${task.prospects?.campaignName || '--'}</div>
                                <div class="mb-2"><strong># Prospects:</strong> ${task.prospects?.quantity || 0}</div>
                                <div class="mb-2"><strong>Target - Conv to Won:</strong> ${task.prospects?.convertToWon || 0}</div>
                                <div class="mb-2"><strong>Sales (INR):</strong> ${formatIndianRupees(task.prospects?.employeeSaleTarget || 0)}</div>
                                <div class="mb-2"><strong>Comment:</strong> ${task.prospects?.comment || '--'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
            
            const groupHtml = `
                <div class="card mb-4 task-group">
                    <div class="card-header">
                        <h5 class="mb-0">Date: ${formatDateForDisplay(group.tasks[0].taskDate)} | Organization: ${group.organizationName} | Process: ${group.processName}</h5>
                    </div>
                    <div class="card-body">
                        ${tasksHtml}
                    </div>
                </div>

                <div class="card mb-5">
                    <div class="card-header">
                        Daily Performance Update
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Time Slot</th>
                                        <th># Calls</th>
                                        <th># Prospects</th>
                                        <th># Won</th>
                                        <th>Value (INR)</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="dailyPerformanceTableBody-${group.processId}">
                                </tbody>
                                <tfoot>
                                    <tr id="dailyPerformanceTotalRow-${group.processId}">
                                        <td><strong>Total</strong></td>
                                        <td id="totalCalls-${group.processId}"><strong>0</strong></td>
                                        <td id="totalProspects-${group.processId}"><strong>0</strong></td>
                                        <td id="totalWon-${group.processId}"><strong>0</strong></td>
                                        <td id="totalSales-${group.processId}"><strong>0</strong></td>
                                        <td><button class="btn btn-success btn-sm validate-daily-data-btn" data-process-id="${group.processId}">Validate</button></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            `;
            elements.dailyWorkPlanContent.append(groupHtml);
            renderDailyPerformanceTable(group.processId);
        }
    }

    function renderDailyPerformanceTable(processId) {
        const tableBody = $(`#dailyPerformanceTableBody-${processId}`);
        tableBody.empty();
        
        const today = new Date().toISOString().split('T')[0];
        const updates = mockData.hourlyUpdates.filter(u => u.employeeId === loggedInEmployeeId && u.date === today && u.processId === processId);

        const timeSlots = [
            "09:30AM-10:30AM", "10:30AM-11:30AM", "11:30AM-12:30PM", "12:30PM-01:30PM", 
            "01:30PM-02:30PM", "02:30PM-03:30PM", "03:30PM-04:30PM", "04:30PM-05:30PM", "05:30PM-06:30PM"
        ];
        
        timeSlots.forEach(slot => {
            const update = updates.find(u => u.timeSlot === slot);
            const calls = update?.calls || 0;
            const prospects = update?.prospects || 0;
            const wonCases = update?.wonCases || 0;
            const sales = formatIndianRupees(update?.sales || 0);
            
            tableBody.append(`
                <tr>
                    <td>${slot}</td>
                    <td>${calls}</td>
                    <td>${prospects}</td>
                    <td>${wonCases}</td>
                    <td>${sales}</td>
                    <td>
                        <button class="btn btn-primary btn-sm update-hourly-btn"
                                data-slot="${slot}"
                                data-process-id="${processId}"
                                data-calls="${calls}"
                                data-prospects="${prospects}"
                                data-won="${wonCases}"
                                data-sales="${update?.sales || 0}">Update</button>
                    </td>
                </tr>
            `);
        });

        calculateDailyTotals(processId);
    }
    
    function calculateDailyTotals(processId) {
        const today = new Date().toISOString().split('T')[0];
        const updates = mockData.hourlyUpdates.filter(u => u.employeeId === loggedInEmployeeId && u.date === today && u.processId === processId);
        const totals = updates.reduce((acc, curr) => {
            acc.calls += curr.calls;
            acc.prospects += curr.prospects;
            acc.wonCases += curr.wonCases;
            acc.sales += curr.sales;
            return acc;
        }, { calls: 0, prospects: 0, wonCases: 0, sales: 0 });

        $(`#totalCalls-${processId}`).text(totals.calls);
        $(`#totalProspects-${processId}`).text(totals.prospects);
        $(`#totalWon-${processId}`).text(totals.wonCases);
        $(`#totalSales-${processId}`).text(formatIndianRupees(totals.sales));
    }

    function filterAllocatedTasks() {
        const fromDateStr = elements.allocatedTaskFromDate.val();
        const toDateStr = elements.allocatedTaskToDate.val();
        const status = elements.allocatedTaskStatusFilter.val();

        let filteredTasks = mockData.allocatedTasks.filter(task => task.assignedTo === loggedInEmployeeId);

        if (fromDateStr) {
            const fromDate = parseDate(fromDateStr);
            filteredTasks = filteredTasks.filter(task => new Date(task.assignedDate) >= fromDate);
        }

        if (toDateStr) {
            const toDate = parseDate(toDateStr);
            filteredTasks = filteredTasks.filter(task => new Date(task.assignedDate) <= toDate);
        }

        if (status) {
            filteredTasks = filteredTasks.filter(task => task.status === status);
        }

        renderAllocatedTasks(filteredTasks);
    }
    
    function renderAllocatedTasks(tasksToRender = mockData.allocatedTasks.filter(task => task.assignedTo === loggedInEmployeeId)) {
        elements.allocatedTasksTableBody.empty();

        if (tasksToRender.length === 0) {
            elements.allocatedTasksTableBody.append('<tr><td colspan="8" class="text-center">No tasks assigned to you.</td></tr>');
            return;
        }

        const rows = tasksToRender.map(task => {
            const statusBadge = getStatusBadge(task.status);
            const taskCompletedDateDisplay = task.taskCompletedDate ? formatDateForDisplay(task.taskCompletedDate) : '--';
            const assignedDateDisplay = formatDateForDisplay(task.assignedDate);
            const dueDateDisplay = formatDateForDisplay(task.dueDate);

            return `
                <tr data-allocated-task-id="${task.id}">
                    <td>${task.id}</td>
                    <td>${task.task}</td>
                    <td>${assignedDateDisplay}</td>
                    <td>${dueDateDisplay}</td>
                    <td>${taskCompletedDateDisplay}</td>
                    <td>${task.remark || '--'}</td>
                    <td>${statusBadge}</td>
                    <td><button class="btn btn-primary btn-sm update-allocated-task-btn" data-id="${task.id}">Update</button></td>
                </tr>`;
        }).join('');
        elements.allocatedTasksTableBody.html(rows);
    }
    
    function updatePerformanceFilters() {
        const assignedOrgs = [...new Set(allTasks.map(t => t.organization))];
        
        const filteredOrgs = mockData.organizations.filter(org => assignedOrgs.includes(org._id));
        populateDropdown(elements.performanceFilterOrganization, filteredOrgs, '_id', 'name', 'All', true);
        
        elements.performanceFilterOrganization.off('change').on('change', function() {
            const selectedOrgId = $(this).val();
            let assignedProcs = [];
            if(selectedOrgId) {
                assignedProcs = [...new Set(allTasks.filter(t => t.organization === selectedOrgId).map(t => t.process))];
            } else {
                assignedProcs = [...new Set(allTasks.map(t => t.process))];
            }
            const filteredProcs = mockData.processes.filter(proc => assignedProcs.includes(proc._id));
            populateDropdown(elements.performanceFilterProcess, filteredProcs, '_id', 'name', 'All', true);
            applyPerformanceFilters();
        }).trigger('change');
    }

    function applyPerformanceFilters() {
        const fromDateStr = elements.performanceDateFrom.val();
        const toDateStr = elements.performanceDateTo.val();
        const orgId = elements.performanceFilterOrganization.val();
        const procId = elements.performanceFilterProcess.val();

        let filteredTasks = allTasks.filter(task => task.isActive);

        if (fromDateStr) {
            const fromDate = parseDate(fromDateStr);
            filteredTasks = filteredTasks.filter(task => new Date(task.taskDate) >= fromDate);
        }
        if (toDateStr) {
            const toDate = parseDate(toDateStr);
            filteredTasks = filteredTasks.filter(task => new Date(task.taskDate) <= toDate);
        }
        if (orgId) {
            filteredTasks = filteredTasks.filter(task => task.organization === orgId);
        }
        if (procId) {
            filteredTasks = filteredTasks.filter(task => task.process === procId);
        }

        loadPerformanceSummary(filteredTasks);
    }

    function loadPerformanceSummary(tasksToSum = allTasks.filter(task => task.isActive)) {
        const summary = tasksToSum.reduce((acc, task) => {
            acc.leadsTarget += (task.leads?.convertToProspects || 0);
            acc.leadsAchieved += (task.activeLeadsToProspects || 0);
            acc.prospectsTarget += (task.prospects?.convertToWon || 0);
            acc.prospectsAchieved += (task.activeConvertToWon || 0);
            acc.salesTarget += (task.prospects?.employeeSaleTarget || 0);
            acc.salesAchieved += (task.activeSales || 0);
            return acc;
        }, { leadsTarget: 0, leadsAchieved: 0, prospectsTarget: 0, prospectsAchieved: 0, salesTarget: 0, salesAchieved: 0 });

        const leadsScore = summary.leadsTarget > 0 ? ((summary.leadsAchieved / summary.leadsTarget) * 100).toFixed(0) : 0;
        const prospectsScore = summary.prospectsTarget > 0 ? ((summary.prospectsAchieved / summary.prospectsTarget) * 100).toFixed(0) : 0;
        const salesScore = summary.salesTarget > 0 ? ((summary.salesAchieved / summary.salesTarget) * 100).toFixed(0) : 0;
        
        const validScores = [leadsScore, prospectsScore, salesScore].filter(score => score !== 0);
        const overallScore = validScores.length > 0 ? (validScores.reduce((sum, score) => sum + parseInt(score), 0) / validScores.length).toFixed(0) : 0;

        elements.leadsTarget.text(summary.leadsTarget);
        elements.leadsAchieved.text(summary.leadsAchieved);
        elements.leadsScore.text(`${leadsScore}%`);

        elements.prospectsTarget.text(summary.prospectsTarget);
        elements.prospectsAchieved.text(summary.prospectsAchieved);
        elements.prospectsScore.text(`${prospectsScore}%`);

        elements.salesTarget.text(formatIndianRupees(summary.salesTarget));
        elements.salesAchieved.text(formatIndianRupees(summary.salesAchieved));
        elements.salesScore.text(`${salesScore}%`);

        elements.overallScore.text(`${overallScore}%`);
    }
    
    function handleUpdateHourlyData(slot, processId, sales) {
        const update = mockData.hourlyUpdates.find(u => u.timeSlot === slot && u.employeeId === loggedInEmployeeId && u.processId === processId);
        
        const orgs = employeeData.organizations || [];
        const processes = mockData.processes.filter(p => orgs.includes(p.organizationId));
        
        $('#updateHourlyForm').off('submit').on('submit', function(e) {
            e.preventDefault();
            const newProcessId = $('#modalProcessSelect').val();
            if (!newProcessId) {
                alert('Please select a process.');
                return;
            }

            const updatedEntry = {
                date: new Date().toISOString().split('T')[0],
                timeSlot: slot,
                employeeId: loggedInEmployeeId,
                processId: newProcessId,
                calls: parseInt($('#modalNumCalls').val() || 0),
                prospects: parseInt($('#modalNumProspects').val() || 0),
                wonCases: parseInt($('#modalNumWonCases').val() || 0),
                sales: parseFloat($('#modalSalesValue').val() || 0)
            };

            const existingIndex = mockData.hourlyUpdates.findIndex(u => u.timeSlot === slot && u.employeeId === loggedInEmployeeId);
            if(existingIndex !== -1) {
                mockData.hourlyUpdates.splice(existingIndex, 1);
            }
            mockData.hourlyUpdates.push(updatedEntry);

            if (window.parent && window.parent.hourlyUpdatesAdmin) {
                const adminHourlyDataIndex = window.parent.hourlyUpdatesAdmin.findIndex(u => u.timeSlot === slot && u.employeeId === loggedInEmployeeId);
                if (adminHourlyDataIndex !== -1) {
                    window.parent.hourlyUpdatesAdmin.splice(adminHourlyDataIndex, 1);
                }
                window.parent.hourlyUpdatesAdmin.push(updatedEntry);
            }

            alert('Hourly update submitted successfully!');
            $('#updateHourlyDataModal').modal('hide');
            showSection('daily-work-plan-employee', false);
        });

        $('#modalTimeSlot').text(slot);
        $('#modalTimeSlotInput').val(slot);

        const $modalProcessSelect = $('#modalProcessSelect');
        $modalProcessSelect.empty();
        processes.forEach(p => $modalProcessSelect.append(new Option(p.name, p._id)));
        $modalProcessSelect.val(processId).trigger('change.select2');

        if (update) {
            $('#modalNumCalls').val(update.calls);
            $('#modalNumProspects').val(update.prospects);
            $('#modalNumWonCases').val(update.wonCases);
            $('#modalSalesValue').val(update.sales);
        } else {
            $('#modalNumCalls').val('0');
            $('#modalNumProspects').val('0');
            $('#modalNumWonCases').val('0');
            $('#modalSalesValue').val(sales || 0); // Use the sales value from the button's data attribute
        }

        $('#updateHourlyDataModal').modal('show');
    }
    
    function handleValidateDailyData(processId) {
        const today = new Date().toISOString().split('T')[0];
        const updates = mockData.hourlyUpdates.filter(u => u.employeeId === loggedInEmployeeId && u.date === today && u.processId === processId);

        if (updates.length === 0) {
            alert('No hourly updates to validate for today.');
            return;
        }

        const totals = updates.reduce((acc, curr) => {
            acc.calls += curr.calls;
            acc.prospects += curr.prospects;
            acc.wonCases += curr.wonCases;
            acc.sales += curr.sales;
            return acc;
        }, { calls: 0, prospects: 0, wonCases: 0, sales: 0 });

        const matchingTask = allTasks.find(t => t.taskDate === today && t.process === processId);
        if (!matchingTask) {
            alert('No matching task found for this process today to validate against.');
            return;
        }
        
        const newReport = {
            date: today,
            employeeId: loggedInEmployeeId,
            organizationId: matchingTask.organization,
            processId: processId,
            prospects: matchingTask.prospects?.quantity || 0,
            wonCases: matchingTask.prospects?.convertToWon || 0,
            sales: matchingTask.prospects?.employeeSaleTarget || 0,
            achievedCalls: totals.calls,
            achievedProspects: totals.prospects,
            achievedWon: totals.wonCases,
            achievedSales: totals.sales
        };

        if (window.parent && window.parent.dailyWorkReportData) {
            const existingReportIndex = window.parent.dailyWorkReportData.findIndex(r => r.date === today && r.employeeId === loggedInEmployeeId && r.processId === processId);
            if (existingReportIndex !== -1) {
                window.parent.dailyWorkReportData[existingReportIndex] = {
                    ...window.parent.dailyWorkReportData[existingReportIndex],
                    ...newReport
                };
            } else {
                window.parent.dailyWorkReportData.push(newReport);
            }
        }
        
        alert(`Today\'s daily performance data for process ${matchingTask.processName} has been validated and sent to admin for reporting!`);
    }

    // --- MAIN NAVIGATION AND PAGE LOAD ---
    function showSection(sectionId, updateUrl = true) {
        elements.contentSections.addClass('d-none');
        $(`#${sectionId}-section`).removeClass('d-none');
        elements.mainNavbar.find('.nav-link').removeClass('active');
        elements.mainNavbar.find(`[data-section="${sectionId}"]`).addClass('active');

        if (updateUrl) {
            history.pushState(null, '', `#${sectionId}`);
        }

        switch (sectionId) {
            case 'daily-work-plan-employee':
                renderDailyWorkPlan();
                break;
            case 'my-task-employee':
                filterAllocatedTasks();
                break;
            case 'performance-employee':
                updatePerformanceFilters();
                applyPerformanceFilters();
                break;
        }
    }

    $(document).ready(() => {
        // if (!checkAuth()) return; // Re-enable for production

        const employeeName = mockData.employees.find(emp => emp.id === loggedInEmployeeId)?.name || "Employee";
        elements.welcomeMessage.text(`Welcome, ${employeeName}!`);
        
        loadData();
        initializeUIComponents();

        // Attach event listeners
        elements.mainNavbar.on('click', '.nav-link', function(e) {
            e.preventDefault();
            showSection($(this).data('section'), true);
        });

        elements.allocatedTaskFromDate.on('change', filterAllocatedTasks);
        elements.allocatedTaskToDate.on('change', filterAllocatedTasks);
        elements.allocatedTaskStatusFilter.on('change', filterAllocatedTasks);
        elements.applyTaskFilterBtn.on('click', filterAllocatedTasks);
        elements.clearTaskFilterBtn.on('click', () => {
            elements.allocatedTaskFromDate.val('');
            elements.allocatedTaskToDate.val('');
            elements.allocatedTaskStatusFilter.val('').trigger('change.select2');
            filterAllocatedTasks();
        });
        elements.allocatedTasksTableBody.on('click', '.update-allocated-task-btn', function() {
            const taskId = $(this).data('id');
            const taskToEdit = mockData.allocatedTasks.find(t => t.id === taskId);
            if (taskToEdit) {
                $('#editAllocatedTaskId').text(taskToEdit.id);
                elements.modalTaskId.val(taskToEdit.id);
                elements.modalTaskDescription.val(taskToEdit.task);
                elements.modalTaskCompletedDate.val(taskToEdit.taskCompletedDate ? new Date(taskToEdit.taskCompletedDate).toLocaleDateString('en-GB') : '');
                elements.modalEmpRemark.val(taskToEdit.remark);
                elements.modalStatus.val(taskToEdit.status);
                elements.editAllocatedTaskModal.modal('show');
            }
        });
        elements.updateAllocatedTaskForm.on('submit', (e) => {
            e.preventDefault();
            const taskId = elements.modalTaskId.val();
            const task = mockData.allocatedTasks.find(t => t.id === taskId);
            if (!task) return;
            
            task.remark = elements.modalEmpRemark.val();
            task.status = elements.modalStatus.val();
            task.taskCompletedDate = elements.modalTaskCompletedDate.val() ? formatDateToISO(elements.modalTaskCompletedDate.val()) : null;

            alert(`Allocated task ${taskId} updated successfully!`);
            filterAllocatedTasks();
            elements.editAllocatedTaskModal.modal('hide');
        });

        elements.applyPerformanceFilterBtn.on('click', applyPerformanceFilters);
        elements.clearPerformanceFilterBtn.on('click', () => {
            elements.performanceDateFrom.val('');
            elements.performanceDateTo.val('');
            elements.performanceFilterOrganization.val('').trigger('change.select2');
            elements.performanceFilterProcess.val('').trigger('change.select2');
            applyPerformanceFilters();
        });

        elements.dailyWorkPlanContent.on('click', '.update-hourly-btn', function() {
            const slot = $(this).data('slot');
            const processId = $(this).data('process-id');
            const sales = $(this).data('sales'); // Get the sales value from the button's data attribute
            handleUpdateHourlyData(slot, processId, sales);
        });
        elements.dailyWorkPlanContent.on('click', '.validate-daily-data-btn', function() {
            const processId = $(this).data('process-id');
            handleValidateDailyData(processId);
        });

        elements.logoutBtn.on('click', () => {
            localStorage.clear();
            window.location.href = 'login.html';
        });

        // Initial view
        const initialHash = window.location.hash.substring(1);
        const validSection = $(`#${initialHash}-section`).length ? initialHash : 'daily-work-plan-employee';
        showSection(validSection, false);
    });
})(jQuery);