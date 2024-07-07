import java.util.Scanner;

class StudentGradeCalculator {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Get the number of subjects
        System.out.print("Enter the number of subjects: ");
        int numberOfSubjects = scanner.nextInt();

        // Array to store grades
        double[] grades = new double[numberOfSubjects];

        // Input grades
        for (int i = 0; i < numberOfSubjects; i++) {
            System.out.print("Enter grade for subject " + (i + 1) + ": ");
            grades[i] = scanner.nextDouble();
        }

        // Calculate average grade
        double total = 0;
        for (int i = 0; i < numberOfSubjects; i++) {
            total += grades[i];
        }
        double average = total / numberOfSubjects;

        // Determine overall grade
        char grade;
        if (average >= 90) {
            grade = 'A';
        } else if (average >= 80) {
            grade = 'B';
        } else if (average >= 70) {
            grade = 'C';
        } else if (average >= 60) {
            grade = 'D';
        } else {
            grade = 'F';
        }

        // Display results
        System.out.println("Average Grade: " + average);
        System.out.println("Overall Grade: " + grade);

        scanner.close();
    }
}

