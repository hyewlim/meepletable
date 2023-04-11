import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Main {


    public static void main(String[] args) {

        String[][] dishes =
                {{"Salad", "Tomato", "Cucumber", "Salad", "Sauce"},
                        {"Pizza", "Tomato", "Sausage", "Sauce", "Dough"},
                        {"Quesadilla", "Chicken", "Cheese", "Sauce"},
                        {"Sandwich", "Salad", "Bread", "Tomato", "Cheese"}};

        int[] nums = {0,3,0};
        int[][] queries=
                {{2,9},
                {5,6},
                {1,2},
                {2,2},
                {4,5},
                };

        int s = 3;

        System.out.println(solution(s, nums));

    }

    static int[] solution(int s, int[] arr) {

        int[] result = new int[2];

        for (int i = 0; i < arr.length; i++) {

            int sum = 0;
            int right = i;

            while (i <= right && right < arr.length && sum <=s){

                sum += arr[right];


                if (sum == s && arr[right+1] != 0){
                    result[0] = i;
                    result[1] = right;
                    return result;
                }

                right++;


            }

        }

        int[] emp = new int[1];
        emp[0] = -1;

        return emp;

    }


}