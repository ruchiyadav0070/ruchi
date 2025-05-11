import java.util.*;

public class SmartCityTollSystem {
    static Map<String, List<String>> cityGraph = new HashMap<>();

    public static void main(String[] args) {
        // Create route graph (connections only, no toll fee given)
        addRoute("Agra", "Mathura");
        addRoute("Mathura", "Jewar");
        addRoute("Jewar", "Greater Noida");

        // Input
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter starting city: ");
        String start = sc.nextLine();
        System.out.print("Enter destination city: ");
        String end = sc.nextLine();

        List<String> path = new ArrayList<>();
        Set<String> visited = new HashSet<>();
        boolean found = findPath(start, end, path, visited);

        if (found) {
            System.out.println("\nRoute: " + String.join(" → ", path));
            int totalFee = 0;
            int tollCount = 0;

            System.out.println("\nToll Details:");
            for (int i = 0; i < path.size() - 1; i++) {
                String from = path.get(i);
                String to = path.get(i + 1);
                int fee = calculateTollFee(from, to);  // Auto-generated fee
                System.out.println("Toll from " + from + " to " + to + ": ₹" + fee);
                totalFee += fee;
                tollCount++;
            }

            System.out.println("\nTotal tolls: " + tollCount);
            System.out.println("Total cost: ₹" + totalFee);
        } else {
            System.out.println("No route found between " + start + " and " + end);
        }
        sc.close();
    }

    static void addRoute(String from, String to) {
        cityGraph.putIfAbsent(from, new ArrayList<>());
        cityGraph.get(from).add(to);
    }

    static boolean findPath(String current, String destination, List<String> path, Set<String> visited) {
        path.add(current);
        visited.add(current);
        if (current.equals(destination)) return true;

        if (!cityGraph.containsKey(current)) {
            path.remove(path.size() - 1);
            return false;
        }

        for (String neighbor : cityGraph.get(current)) {
            if (!visited.contains(neighbor)) {
                if (findPath(neighbor, destination, path, visited)) {
                    return true;
                }
            }
        }

        path.remove(path.size() - 1);
        return false;
    }

    // Auto-generate toll fee (mock example — real-world would use DB/API)
    static int calculateTollFee(String from, String to) {
        if (from.equals("Agra") && to.equals("Mathura")) return 140;
        else if (from.equals("Mathura") && to.equals("Jewar")) return 155;
        else if (from.equals("Jewar") && to.equals("Greater Noida")) return 135;
        else return 100; // default
    }
}