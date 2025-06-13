/**
 * Salary Calculator Utility
 * Handles payroll calculations for employees
 * Computes gross salary, tax amount, and net salary
 */

/**
 * Calculate payroll for an employee
 * @param {Object} employee - Employee object containing salary information
 * @param {number} employee.baseSalary - Employee's base salary
 * @param {number} [employee.bonuses] - Optional bonus amount
 * @param {number} employee.taxRate - Tax rate percentage
 * @param {number} [employee.deductions] - Optional deductions amount
 * @returns {Object} Object containing calculated salary components
 * @returns {number} returns.grossSalary - Total salary before deductions
 * @returns {number} returns.taxAmount - Calculated tax amount
 * @returns {number} returns.netSalary - Final salary after all deductions
 */
exports.calculatePayroll = (employee) => {
    // Calculate gross salary by adding base salary and bonuses (if any)
    const grossSalary = employee.baseSalary + (employee.bonuses || 0);
    
    // Calculate tax amount based on gross salary and tax rate
    const taxAmount = grossSalary * (employee.taxRate / 100);
    
    // Calculate net salary by subtracting tax and deductions from gross salary
    const netSalary = grossSalary - taxAmount - (employee.deductions || 0);
  
    return { grossSalary, taxAmount, netSalary };
};
  